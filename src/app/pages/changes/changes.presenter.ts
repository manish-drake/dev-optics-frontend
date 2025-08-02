import { Component, OnInit } from '@angular/core';
import { ChangesComponent } from "./changes.component";
import { ChangeModel } from '../../services/model-interface/interfaces';
import { ModelService } from '../../services/model-services/model.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-changes-presenter',
  standalone: true,
  imports: [ChangesComponent],
  template: `<app-changes [datasource]="ds" (deleteChange)="deleteChangeById($event)"></app-changes>`,
  styleUrl: './changes.component.scss'
})
export class ChangesPresenter implements OnInit {

  ds: ChangeModel[] = [];

  constructor(private modelService: ModelService) {}

  ngOnInit(){
   this.loadChange()
  }

  loadChange() {
    this.modelService.getChange().subscribe({
      next: (data) => {
        this.ds = data
        console.log("Changes List DS:", this.ds)
      }
    })
  }

  deleteChangeById(id: number){
      Swal.fire({
               title: 'Are you sure?',
               text: 'You want to delete this Change',
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#d33',
               cancelButtonColor: '#3085d6',
               confirmButtonText: 'Delete'
             }).then((result) => {
               if (result.isConfirmed) {
                 this.modelService.deleteChange(id).subscribe({
                   next: (data) => {
                     console.log("Deleted Change log:", data);
                     Swal.fire(
                       'Deleted!',
                       'The Change has been deleted.',
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
