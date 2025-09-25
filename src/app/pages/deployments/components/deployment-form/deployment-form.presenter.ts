import { Component, OnInit } from '@angular/core';
import { DeploymentFormComponent } from "./deployment-form.component";
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModelService } from '../../../../services/model-services/model.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  DeploymentModel,
  VersionModel,
} from '../../../../services/model-interface/interfaces';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-deployment-form-presenter',
  standalone: true,
  imports: [DeploymentFormComponent],
  template: `<app-deployment-form [form]="form" [app]="appName" [milestone]="milestone" [editMode]="isEditMode"
      (formSubmit)="submit()" (onLoadChangeLog)="loadChangeLog()"></app-deployment-form>`,
  styleUrl: './deployment-form.component.scss'
})
export class DeploymentFormPresenter implements OnInit {
  public isLoadingChangeLog = false;
  private allVersions: VersionModel[] = [];

  loadChangeLog() {
    const app = this.form.get('app')?.value as string;
    const version = this.form.get('version')?.value as string;

    if (!app || !version) {
      alert('Please select an App and enter a Version (e.g., 0.0.0) before loading the change log.');
      return;
    }

    const url = `http://drake.in:1337/apps/${encodeURIComponent(app)}/versions/${encodeURIComponent(version)}/changes/`;
    this.isLoadingChangeLog = true;

    this.http
      .get<any[]>(url)
      .pipe(finalize(() => (this.isLoadingChangeLog = false)))
      .subscribe({
        next: (changes) => {
          const md = this.buildChangeLogMarkdown(changes || []);
          this.form.get('change_log')?.setValue(md);
        },
        error: (err) => {
          console.error('Failed to load change log', err);
          alert('Failed to load change log from server.');
        },
      });
  }

  private buildChangeLogMarkdown(changes: any[]): string {
    if (!Array.isArray(changes) || changes.length === 0) {
      return '*No changes found for the selected app/version.*';
    }
    const formatDate = (iso?: string) => {
      if (!iso) return '';
      try {
        const d = new Date(iso);
        return d.toLocaleString(undefined, {
          year: 'numeric', month: 'short', day: '2-digit',
          hour: '2-digit', minute: '2-digit'
        });
      } catch { return iso; }
    };

    return changes
      .map((c) => {
        const date = formatDate(c.dtt_change);
        const category = c.category ?? '';
        const title = c.change_title ?? '';
        const desc = c.change_desc ?? '';
        const img = c.image_url ? `\n\n![Snapshot](${c.image_url})` : '';
        return `**Date of implementation:** ${date}\n\n**Type of development:** ${category}\n\n**Title:** ${title}\n\n**Detail:** ${desc}${img}\n\n---`;
      })
      .join('\n');
  }

  public form!: FormGroup;
  public deployId: number | null = null;
  public isEditMode = false;
  public appName: string[] = [];
  public milestone: string[] = [];

  constructor(
    private modelService: ModelService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient
  ) { }
  ngOnInit(): void {

    this.buildForm();
    this.form
      .get('app')
      ?.valueChanges.subscribe((appName: string) => {
        if (!appName) {
          this.form.get('version')?.setValue('');
          return;
        }

        this.populateCurrentVersion(appName);
      });
    this.route.params.subscribe((params) => {
      this.deployId = params['id'];
      this.isEditMode = !!this.deployId;
      if (this.isEditMode && this.deployId) {
        this.modelService.getSingleDeploy(this.deployId).subscribe({
          next: (data) => {
            this.form.patchValue(data, { emitEvent: false });
          },
          error: (err) => console.log('Single data get error:', err)
        })
      }
    })

    this.modelService.getAppNames().subscribe({
      next: (data) => {
        this.appName = data
      }
    })

    this.modelService.getMilestonesList().subscribe({
      next: (data) => {
        this.milestone = data
      }
    })

    this.modelService.getVersion().subscribe({
      next: (versions) => {
        this.allVersions = versions;
        const selectedApp = this.form.get('app')?.value;
        const versionControl = this.form.get('version');

        if (selectedApp && (!versionControl?.value || versionControl.value === '')) {
          this.populateCurrentVersion(selectedApp);
        }
      }
    })

  }

  private populateCurrentVersion(appName: string) {
    if (!this.allVersions.length) {
      return;
    }

    const versionControl = this.form.get('version');
    if (!versionControl) {
      return;
    }

    const currentVersion = this.allVersions.find(
      (version) => version.app === appName && version.current
    );

    versionControl.setValue(currentVersion ? currentVersion.version : '');
  }

  private buildForm(): void {
    this.form = this.fb.group({
      id: [''],
      dtt_deploy: [''],
      milestone: [''],
      app: [''],
      version: [''],
      git_tag: [''],
      docker_tag: [''],
      change_log: ['']
    })
  }

  submit(): void {
    if (this.form.invalid) return;
    const deployData: DeploymentModel = this.form.value;

    if (this.isEditMode) {
      this.modelService.updateDeploy(deployData.id, deployData).subscribe({
        next: () => {
          console.log('Updated successfully');
          this.router.navigate(['/deployment']);
        },
        error: (err) => console.log('Update Error:', err)
      })
    } else {
      this.modelService.createDeploy(deployData).subscribe({
        next: () => {
          console.log('Created successfully');
          this.form.reset();
          this.router.navigate(['/deployment'])
        }
      })
    }
  }


}
