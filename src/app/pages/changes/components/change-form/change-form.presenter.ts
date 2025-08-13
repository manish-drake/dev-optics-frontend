import { Component, OnInit } from '@angular/core';
import { ChangeFormComponent } from './change-form.component';
import {
  CategoryEnum,
  ChangeModel,
} from '../../../../services/model-interface/interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModelService } from '../../../../services/model-services/model.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environment/environment';

@Component({
  selector: 'app-change-form-presenter',
  standalone: true,
  imports: [ChangeFormComponent],
  template: `
    <app-change-form
      [form]="form"
      [app]="appName"
      [versions]="versions"
      [imageUrl]="imageUrl"
      [selectContributors]="selectedContributors"
      [editMode]="isEditMode"
      [category]="categoryList"
      (formSubmit)="submit()"
      (file)="onImageFile($event)"
      (ContributorToggle)="onContributorChange($event)"
    ></app-change-form>
  `,
  styleUrl: './change-form.component.scss',
})
export class ChangeFormPresenter implements OnInit {
  imageUrl: string | null = null;
  categorySelected: boolean = false;
  isUpdateMode: boolean = false;
  selectedContributors: string[] = [];
  dropdownOpen = false;

  categoryList: string[] = [];
  appName: string[] = [];

  public form!: FormGroup;
  public changeId: number | null = null;
  public isEditMode = false;
  versions: string[] = [];

  constructor(
    private modelService: ModelService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.categoryList = Object.values(CategoryEnum);
    this.buildForm();

    this.route.params.subscribe((params) => {
      this.changeId = params['id'];
      this.isEditMode = !!this.changeId;
      if (this.isEditMode && this.changeId) {
        this.modelService.getSingleChange(this.changeId).subscribe({
          next: (data) => {
            console.log('Patch Data:', data);
            this.form.patchValue(data);
            this.imageUrl = data.image_url;

            // ✅ Set selected contributors if any
            if (data.dev) {
              this.selectedContributors = data.dev
                .split(',')
                .map((c: string) => c.trim());
            }
          },
          error: (err) => console.log('Single data get error:', err),
        });
      }
    });

    this.modelService.getAppNames().subscribe({
      next: (appNames) => {
        this.appName = appNames;
      },
    });

    this.modelService.getVersions().subscribe({
      next: (versions) => {
        console.log('Available versions:', versions);
        this.versions = versions;
      }
    })
  }

  onContributorChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (input.checked) {
      if (!this.selectedContributors.includes(value)) {
        this.selectedContributors.push(value);
      }
    } else {
      this.selectedContributors = this.selectedContributors.filter(
        (c) => c !== value
      );
    }

    // Update form control with comma-separated string
    this.form.get('dev')?.setValue(this.selectedContributors.join(','));
  }

  private buildForm(): void {
    this.form = this.fb.group({
      id: [''],
      app: [''],
      version: [''],
      dtt_change: [''],
      change_title: [''],
      change_desc: [''],
      category: [''],
      dev: [''],
      image_url: [''],
    });
  }

  onImageFile(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.modelService.imageUpload(file).subscribe({
        next: (response) => {
          console.log('Upload successful:', response);
          const fullUrl = `${environment.apiUrl}${response.url}`;
          this.imageUrl = fullUrl;
          this.form.get('image_url')?.setValue(fullUrl);
        },
        error: (err) => {
          console.error('Upload failed:', err);
        },
      });
    }
  }

  submit() {
    if (this.form.invalid) return;
    const changeData: ChangeModel = this.form.value;

    if (this.isEditMode) {
      this.modelService.updateChange(changeData.id, changeData).subscribe({
        next: () => {
          console.log('Update successfully');
          this.router.navigate(['/change']);
        },
        error: (err) => console.log('Update Error:', err),
      });
    } else {
      this.modelService.createChange(changeData).subscribe({
        next: () => {
          console.log('Created successfully');
          this.form.reset();
          this.router.navigate(['/change']);
        },
      });
    }
  }
}
