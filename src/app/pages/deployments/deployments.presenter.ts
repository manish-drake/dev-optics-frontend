import { Component } from '@angular/core';
import { DeploymentsComponent } from "./deployments.component";

@Component({
  selector: 'app-deployments-presenter',
  standalone: true,
  imports: [DeploymentsComponent],
  template: `<app-deployments></app-deployments>`,
  styleUrl: './deployments.component.scss'
})
export class DeploymentsPresenter {

}
