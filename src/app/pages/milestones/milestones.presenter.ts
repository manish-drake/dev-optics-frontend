import { Component, OnInit } from '@angular/core';
import { MilestonesComponent } from "./milestones.component";
import { MilestoneModel } from '../../services/model-interface/interfaces';
import { ModelService } from '../../services/model-services/model.service';

@Component({
  selector: 'app-milestones-presenter',
  standalone: true,
  imports: [MilestonesComponent],
  template:`<app-milestones [datasource]="ds"></app-milestones>` ,
  styleUrl: './milestones.component.scss'
})
export class MilestonesPresenter implements OnInit{

  ds: MilestoneModel[] = [];

  constructor(private modelService: ModelService) { }

  ngOnInit() {
    this.loadMilestone();
  }

  loadMilestone() {
    this.modelService.getMilestone().subscribe({
      next: (data) => {
        this.ds = data;
        console.log('Milestone List DS:', this.ds)
      }
    })
  }
}
