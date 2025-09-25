import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChangeCardsComponent } from "./components/change-cards/change-cards.component";
import { FormsModule } from '@angular/forms';
import { ChangeFilterOption } from '../../services/model-interface/interfaces';

@Component({
  selector: 'app-changes',
  standalone: true,
  imports: [CommonModule, RouterModule, ChangeCardsComponent, FormsModule],
  templateUrl: './changes.component.html',
  styleUrl: './changes.component.scss'
})
export class ChangesComponent {

  @Input() datasource: any;
  @Input() filterOptions: ChangeFilterOption[] = [];
  @Input() selectedFilter: ChangeFilterOption | null = null;
  @Output() deleteChange = new EventEmitter<number>()
  @Output() filterChange = new EventEmitter<ChangeFilterOption>()
  
  onDelete(id: number){
   this.deleteChange.emit(id)
  }

  onFilterSelection(option: ChangeFilterOption | null) {
    if (option) {
      this.filterChange.emit(option);
    }
  }

}
