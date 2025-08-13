import { Component, OnInit } from '@angular/core';
import { AppsComponent } from "./apps.component";
import { AppModel } from '../../services/model-interface/interfaces';
import { ModelService } from '../../services/model-services/model.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-apps-presenter',
  standalone: true,
  imports: [AppsComponent],
  template: `<app-apps [datasource]="ds" (deleteApp)="deleteAppById($event)"></app-apps>`,
  styleUrl: './apps.component.scss'
})
export class AppsPresenter implements OnInit {

  ds: AppModel[] = []

  constructor(private modelService: ModelService) {

  }

  ngOnInit() {
    this.loadApps()
  }

  loadApps() {
    this.modelService.getApps().subscribe({
      next: (data) => {
        this.ds = data;
        console.log("Apps Cards Ds", this.ds)
      },
      error: (err) => {
        console.error('Error loading apps:', err);
      }
    })
  }

  deleteAppById(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this App',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete'
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        this.modelService.deleteApp(id).subscribe({
          next: (data) => {
            console.log("Deleted App:", data);
            Swal.fire(
              'Deleted!',
              'The app has been deleted.',
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
