import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-cards',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './change-cards.component.html',
  styleUrl: './change-cards.component.scss'
})
export class ChangeCardsComponent {
  @Input() datasource: any;
  @Output() changeDelete = new EventEmitter<number>()

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
onDelete(id: number){
  this.changeDelete.emit(id);
}
previewImage(imageUrl: string): void {
  Swal.fire({
    title: 'Image Preview',
    imageUrl: imageUrl,
    showCloseButton: true,
    showConfirmButton: false,
    width: 'auto',
    padding: '1em',
    background: '#fff',
  });
}

}
