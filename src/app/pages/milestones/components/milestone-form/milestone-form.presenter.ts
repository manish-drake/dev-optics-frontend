import { Component } from '@angular/core';
import { MilestoneFormComponent } from "./milestone-form.component";
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MilestoneModel, VersionModel } from '../../../../services/model-interface/interfaces';
import { ModelService } from '../../../../services/model-services/model.service';

@Component({
  selector: 'app-milestone-form-presenter',
  standalone: true,
  imports: [MilestoneFormComponent],
  template: `<app-milestone-form [form]="form" [editMode]="isEditMode"
      (formSubmit)="submit()" ></app-milestone-form>`,
  styleUrl: './milestone-form.component.scss'
})
export class MilestoneFormPresenter {

  
    public form!: FormGroup;
    public milestoneId: number | null = null;
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
        this.milestoneId = params['id'];
        this.isEditMode = !!this.milestoneId;
        if(this.isEditMode && this.milestoneId) {
          this.modelService.getSingleMilestone(this.milestoneId).subscribe({
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
        milestone: [''],
        goal: [''],
        dt_milestone: [''], 
        proj_ver: [''],
        complete: [false]
      })
    }
  
    submit(): void {
      if(this.form.invalid) return;
  
      const milestoneData: MilestoneModel = this.form.value;
  
      if(this.isEditMode){
        this.modelService.updateMilestone(milestoneData.id, milestoneData).subscribe({
          next: () => {
            console.log('Updated successfully');
            this.router.navigate(['/milestones']);
          },
          error: (err) => console.error('Update error:', err)
        });
      } else {
        this.modelService.createMileStone(milestoneData).subscribe({
          next: () => {
            console.log('Created successfully');
            this.form.reset();
            this.router.navigate(['/milestones'])
          }
        })
      }
    }

}
