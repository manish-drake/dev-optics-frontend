import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChangeCardsComponent } from "./components/change-cards/change-cards.component";

@Component({
  selector: 'app-changes',
  standalone: true,
  imports: [CommonModule, RouterModule, ChangeCardsComponent],
  templateUrl: './changes.component.html',
  styleUrl: './changes.component.scss'
})
export class ChangesComponent {

  @Input() datasource: any;
  @Output() deleteChange = new EventEmitter<number>()
  
  onDelete(id: number){
   this.deleteChange.emit(id)
  }

}
