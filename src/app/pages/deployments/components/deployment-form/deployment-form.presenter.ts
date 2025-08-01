import { Component, OnInit } from '@angular/core';
import { DeploymentFormComponent } from "./deployment-form.component";
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModelService } from '../../../../services/model-services/model.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeploymentModel } from '../../../../services/model-interface/interfaces';

@Component({
  selector: 'app-deployment-form-presenter',
  standalone: true,
  imports: [DeploymentFormComponent],
  template: `<app-deployment-form [form]="form" [app]="appName" [editMode]="isEditMode"
      (formSubmit)="submit()"></app-deployment-form>`,
  styleUrl: './deployment-form.component.scss'
})
export class DeploymentFormPresenter implements OnInit {

  public form!: FormGroup;
  public deployId: number | null = null;
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
    this.route.params.subscribe((params)=> {
      this.deployId = params['id'];
      this.isEditMode = !!this.deployId;
      if(this.isEditMode && this.deployId){
        this.modelService.getSingleDeploy(this.deployId).subscribe({
          next: (data) => {
            this.form.patchValue(data);
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

  submit() : void {
    if(this.form.invalid) return;
    const deployData: DeploymentModel = this.form.value;

    if(this.isEditMode) {
       this.modelService.updateDeploy(deployData.id, deployData).subscribe({
        next: () => {
          console.log('Updated successfully');
          this.router.navigate(['/deployment']);
        },
        error : (err) => console.log('Update Error:', err)
       })
    } else {
      this.modelService.createDeploy(deployData).subscribe({
        next:() =>{
          console.log('Created successfully');
          this.form.reset();
          this.router.navigate(['/deployment'])
        }
      })
    }
  }

 
}
