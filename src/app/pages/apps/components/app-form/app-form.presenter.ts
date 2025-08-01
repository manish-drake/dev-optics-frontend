import { Component, OnInit } from '@angular/core';
import { AppFormComponent } from "./app-form.component";
import { AppModel } from '../../../../services/model-interface/interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModelService } from '../../../../services/model-services/model.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-app-form-presenter',
  standalone: true,
  imports: [AppFormComponent],
  template: `<app-app-form [form]="form" [editMode]="isEditMode"
      (formSubmit)="submit()"></app-app-form>`,
  styleUrl: './app-form.component.scss'
})
export class AppFormPresenter implements OnInit {
  public form!: FormGroup;
  public appId: number | null = null;
  public isEditMode = false;

  constructor(
    private modelService: ModelService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm();

    this.route.params.subscribe((params) => {
      this.appId = params['id'];
      this.isEditMode = !!this.appId;
      if (this.isEditMode && this.appId) {
        this.modelService.getSingleApp(this.appId).subscribe({
          next: (data) => {
            this.form.patchValue(data); // pre-fill form on edit
          },
          error: (err) => console.error('Error loading app', err),
        });
      }
    });
  }

  private buildForm(): void {
    this.form = this.fb.group({
      id: [''],
      app: [''],
      description: [''],
      tech_stack: [''],
      github_repo: [''],
      docker_repo: [''],
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    const appData: AppModel = this.form.value;

    if (this.isEditMode) {
      this.modelService.updateApp(appData.id, appData).subscribe({
        next: () => {
          console.log('Updated successfully');
          this.router.navigate(['/app']);
        },
        error: (err) => console.error('Update error', err)
      });
    } else {
      this.modelService.createApp(appData).subscribe({
        next: () => {
          console.log('Created successfully');
          this.form.reset();
          this.router.navigate(['/app']);
        },
        error: (err) => console.error('Create error', err)
      });
    }
  }
 


  }
