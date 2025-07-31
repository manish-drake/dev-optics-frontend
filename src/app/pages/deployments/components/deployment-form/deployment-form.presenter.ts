import { Component } from '@angular/core';
import { DeploymentFormComponent } from "./deployment-form.component";

@Component({
  selector: 'app-deployment-form-presenter',
  standalone: true,
  imports: [DeploymentFormComponent],
  template: `<app-deployment-form></app-deployment-form>`,
  styleUrl: './deployment-form.component.scss'
})
export class DeploymentFormPresenter {

}
