import { Component, OnInit } from '@angular/core';
import { VersionFormComponent } from "./version-form.component";
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModelService } from '../../../../services/model-services/model.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VersionModel } from '../../../../services/model-interface/interfaces';

@Component({
  selector: 'app-version-form-presenter',
  standalone: true,
  imports: [VersionFormComponent],
  template: `<app-version-form [form]="form" [editMode]="isEditMode"
      (formSubmit)="submit()"></app-version-form>`,
  styleUrl: './version-form.component.scss'
})
export class VersionFormPresenter implements OnInit {

  public form!: FormGroup;
  public versionId: number | null = null;
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
          console.log('Updated successfully');
          this.router.navigate(['/versions']);
        },
        error: (err) => console.error('Update error:', err)
      });
    } else {
      this.modelService.createVersion(versionData).subscribe({
        next: () => {
          console.log('Created successfully');
          this.form.reset();
          this.router.navigate(['/versions'])
        }
      })
    }
  }
}
