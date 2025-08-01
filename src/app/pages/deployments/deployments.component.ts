import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DeploymentCardsComponent } from "./components/deployment-cards/deployment-cards.component";

@Component({
  selector: 'app-deployments',
  standalone: true,
  imports: [CommonModule, RouterModule, DeploymentCardsComponent],
  templateUrl: './deployments.component.html',
  styleUrl: './deployments.component.scss'
})
export class DeploymentsComponent {

  @Input()  datasource: any;
  @Output() deleteVersion =  new EventEmitter<number>()


  onDelete(id: number) {
   this.deleteVersion.emit(id);
}


}
