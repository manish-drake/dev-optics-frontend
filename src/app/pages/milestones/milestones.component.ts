import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-milestones',
  standalone: true,
  imports: [],
  templateUrl: './milestones.component.html',
  styleUrl: './milestones.component.scss'
})
export class MilestonesComponent {
 
  @Input() datasource: any;

  getCompletedCount(): number {
    return this.datasource.filter((item: { complete: boolean; })=> item.complete === true).length;
  }

getProgress(): number {
  const total = this.datasource.length;
  const completed = this.getCompletedCount();
  return total > 0 ? Math.round((completed / total) * 100) : 0;
}

}
