import { Component, OnInit } from '@angular/core';
import { VersionFormComponent } from "./version-form.component";
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModelService } from '../../../../services/model-services/model.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VersionModel } from '../../../../services/model-interface/interfaces';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-version-form-presenter',
  standalone: true,
  imports: [VersionFormComponent],
  template: `<app-version-form [form]="form" [app]="appName" [editMode]="isEditMode"
      (formSubmit)="submit()"></app-version-form>`,
  styleUrl: './version-form.component.scss'
})
export class VersionFormPresenter implements OnInit {

  public form!: FormGroup;
  public versionId: number | null = null;
  public isEditMode = false;
  public appName: string[] = [];

  constructor(
    private modelService: ModelService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.buildForm();
    
    this.route.params.subscribe((params) => {
      this.versionId = params['id'];
      this.isEditMode = !!this.versionId;
      if(this.isEditMode && this.versionId) {
        this.modelService.getSingleVersion(this.versionId).subscribe({
          next: (data) =>{
            this.form.patchValue(data);
          },
          error: (err) => console.log("Single data Get error:", err)
        })
      }
    })

    this.modelService.getAppNames().subscribe({
      next: (data) => {
        this.appName = data
      }
    })

    

  }

  private buildForm(): void {
    this.form = this.fb.group({
      id: [''],
      version: [''],
      app: [''],
      dt_started: [''], 
      description: [''],
      delta_maj: [0],
      delta_min: [0],
      delta_pat: [0],
      current: [true]
    })
  }

  submit(): void {
    if(this.form.invalid) return;

    const versionData: VersionModel = this.form.value;

    if(this.isEditMode){
      this.modelService.updateVersion(versionData.id, versionData).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Version updated',
            text: 'The version was updated successfully.',
          }).then(() => this.router.navigate(['/versions']))
        },
        error: (err) => {
          console.error('Update error:', err);
          Swal.fire({
            icon: 'error',
            title: 'Update failed',
            text: err?.error?.detail ?? 'Something went wrong while updating the version.',
          });
        }
      });
    } else {
      this.modelService.createVersion(versionData).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Version created',
            text: 'The version was created successfully.',
          }).then(() => {
            this.form.reset();
            this.router.navigate(['/versions']);
          });
        },
        error: (err) => {
          console.error('Create error:', err);
          Swal.fire({
            icon: 'error',
            title: 'Creation failed',
            text: err?.error?.detail ?? 'Something went wrong while updating the version.',
          });
        }
      })
    }
  }
}
