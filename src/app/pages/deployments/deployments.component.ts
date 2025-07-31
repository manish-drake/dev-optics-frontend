import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-deployments',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './deployments.component.html',
  styleUrl: './deployments.component.scss'
})
export class DeploymentsComponent {

}
