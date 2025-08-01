import { Component } from '@angular/core';
import { MilestonesComponent } from "./milestones.component";

@Component({
  selector: 'app-milestones-presenter',
  standalone: true,
  imports: [MilestonesComponent],
  template:`<app-milestones></app-milestones>` ,
  styleUrl: './milestones.component.scss'
})
export class MilestonesPresenter {

}
