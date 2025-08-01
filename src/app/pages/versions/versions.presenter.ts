import { Component, OnInit } from '@angular/core';
import { VersionsComponent } from "./versions.component";
import { VersionModel } from '../../services/model-interface/interfaces';
import { ModelService } from '../../services/model-services/model.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-versions-presenter',
  standalone: true,
  imports: [VersionsComponent],
  template: `<app-versions [datasource]="ds" (deleteVersion)="deleteVersionById($event)"></app-versions>`,
  styleUrl: './versions.component.scss'
})
export class VersionsPresenter implements OnInit {

  ds: VersionModel[] = [];

  constructor(private modelService: ModelService) {}

  ngOnInit(){
   this.loadVersion()
  }

  loadVersion() {
    this.modelService.getVersion().subscribe({
      next: (data) => {
        this.ds = data;
        console.log("Version List DS:", this.ds)
      }
    })
  }

  deleteVersionById(id: number): void {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You want to delete this Version',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Delete'
      }).then((result) => {
        if (result.isConfirmed) {
          this.modelService.deleteVersion(id).subscribe({
            next: (data) => {
              console.log("Deleted version:", data);
              Swal.fire(
                'Deleted!',
                'The version has been deleted.',
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
