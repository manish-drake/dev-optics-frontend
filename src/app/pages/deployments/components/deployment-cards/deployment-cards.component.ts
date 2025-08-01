import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { eventListeners } from '@popperjs/core';

@Component({
  selector: 'app-deployment-cards',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './deployment-cards.component.html',
  styleUrl: './deployment-cards.component.scss'
})
export class DeploymentCardsComponent {
  @Input() datasource: any;
  @Output() deployDelete = new EventEmitter<number>();

   constructor(private router: Router) {
  
    }

    onDeleteDeployment(id: number){
      this.deployDelete.emit(id);
    }

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
