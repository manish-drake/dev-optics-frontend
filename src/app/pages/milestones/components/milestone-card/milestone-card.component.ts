import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-milestone-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './milestone-card.component.html',
  styleUrl: './milestone-card.component.scss'
})
export class MilestoneCardComponent {

  @Input() datasource: any;

}
