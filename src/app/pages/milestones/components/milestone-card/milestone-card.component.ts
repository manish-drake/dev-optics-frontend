import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModelService } from '../../../../services/model-services/model.service';
import Swal from 'sweetalert2';

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
  constructor(private modelService: ModelService) { }

  deleteMilestone(id: number){
    this.milestoneDelete.emit(id)
  }
loadMilestoneById(id: number) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'Are you sure you have completed this milestone?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      this.modelService.getSingleMilestone(id).subscribe({
        next: (data) => {
          console.log('Single Milestone Data:', data);

          this.updateMilestone(id, data);

          Swal.fire('Completed!', 'The milestone has been marked as completed.', 'success');
        },
        error: (err) => {
          console.error('Error fetching milestone:', err);
          Swal.fire('Error', 'There was a problem completing the milestone.', 'error');
        }
      });
    }
  });
}

// PUT request for milestone
updateMilestone(id: number, updatedValues: any) {
  if (!id) {
    console.error('No milestone ID provided, cannot update.');
    return;
  }


  console.log('Updating milestone with ID:', id);
  console.log('Payload being sent:', updatedValues);
  const payload = {
  "milestone": updatedValues.milestone,
  "goal": updatedValues.goal,
  "dt_milestone": updatedValues.dt_milestone,
  "proj_ver": updatedValues.proj_ver,
  "complete": true,
  "id" : 0
  }
  this.modelService.updateMilestone(id, payload).subscribe({
    next: (response) => {
      console.log('Milestone updated successfully:', response);
         window.location.reload();
    },
    error: (error) => {
      console.error('Error updating milestone:', error);
      if (error.status === 422) {
        console.warn('Validation failed — check payload and required fields.');
      }
    }
  });
}
}