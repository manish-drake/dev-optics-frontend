import { Component, OnInit } from '@angular/core';
import { DeploymentsComponent } from "./deployments.component";
import { DeploymentModel } from '../../services/model-interface/interfaces';
import { ModelService } from '../../services/model-services/model.service';

@Component({
  selector: 'app-deployments-presenter',
  standalone: true,
  imports: [DeploymentsComponent],
  template: `<app-deployments [datasource]="ds"></app-deployments>`,
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
}
