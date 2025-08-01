import { Component, OnInit } from '@angular/core';
import { DeploymentsComponent } from "./deployments.component";
import { DeploymentModel } from '../../services/model-interface/interfaces';
import { ModelService } from '../../services/model-services/model.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deployments-presenter',
  standalone: true,
  imports: [DeploymentsComponent],
  template: `<app-deployments [datasource]="ds" (deleteVersion)="deleteDeployById($event)"></app-deployments>`,
  styleUrl: './deployments.component.scss'
})
export class DeploymentsPresenter implements OnInit {

  ds: DeploymentModel[] = [];

  constructor(private modelService: ModelService){}

  ngOnInit(){
   this.loadDeployment();
  }

  loadDeployment() {
    this.modelService.getDeploy().subscribe({
      next: (data) =>{
        this.ds = data;
        console.log("Deployment List DS:", this.ds);
      }
    })
  }

   deleteDeployById(id: number): void {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You want to delete this Deployement',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Delete'
        }).then((result) => {
          if (result.isConfirmed) {
            this.modelService.deleteDeploy(id).subscribe({
              next: (data) => {
                console.log("Deleted Deployment:", data);
                Swal.fire(
                  'Deleted!',
                  'The Deployment has been deleted.',
                  'success'
                ).then(() => {
                  location.reload(); // Reload the page after the alert is closed
                });
              },
              error: (err) => {
                Swal.fire(
                  'Error!',
                  'Something went wrong while deleting.',
                  'error'
                );
              }
            });
          }
        });
      }
}
