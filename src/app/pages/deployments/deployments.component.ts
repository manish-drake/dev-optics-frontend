import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-deployments',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './deployments.component.html',
  styleUrl: './deployments.component.scss'
})
export class DeploymentsComponent {

  @Input()  datasource: any;


  formatDateAndTime(input: string): string {
  const date = new Date(input);

  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  const datePart = date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const timePart = date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return `${datePart} ${timePart}`;
}




}
