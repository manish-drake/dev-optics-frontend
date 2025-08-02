import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-milestone-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './milestone-card.component.html',
  styleUrl: './milestone-card.component.scss'
})
export class MilestoneCardComponent {

  @Input() datasource: any;
  @Output() milestoneDelete = new EventEmitter<number>()

  deleteMilestone(id: number){
    this.milestoneDelete.emit(id)
  }

}
