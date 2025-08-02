import { Component, OnInit } from '@angular/core';
import { MilestonesComponent } from "./milestones.component";
import { MilestoneModel } from '../../services/model-interface/interfaces';
import { ModelService } from '../../services/model-services/model.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-milestones-presenter',
  standalone: true,
  imports: [MilestonesComponent],
  template:`<app-milestones [datasource]="ds" (deleteMilestone)="deleteMilestoneById($event)"></app-milestones>` ,
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

  deleteMilestoneById(id: number){
     Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete this Milestone',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Delete'
          }).then((result) => {
            if (result.isConfirmed) {
              this.modelService.deleteMilestone(id).subscribe({
                next: (data) => {
                  console.log("Deleted milestone:", data);
                  Swal.fire(
                    'Deleted!',
                    'The Milestone has been deleted.',
                    'success'
                  ).then(() => {
                    location.reload(); // Reload the page after the alert is closed
                  });
                },
                error: (err) => {
                  Swal.fire(
                    'Error!',
                    'Something went wrong while deleting.',
                    'error'
                  );
                }
              });
            }
          });
  }
}
