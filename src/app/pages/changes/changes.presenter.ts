import { Component, OnInit } from '@angular/core';
import { ChangesComponent } from "./changes.component";
import { ChangeFilterOption, ChangeModel, ChangeQueryParams } from '../../services/model-interface/interfaces';
import { ModelService } from '../../services/model-services/model.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-changes-presenter',
  standalone: true,
  imports: [ChangesComponent],
  template: `<app-changes [datasource]="ds" [filterOptions]="filterOptions" [selectedFilter]="selectedFilter" (filterChange)="onFilterChange($event)" (deleteChange)="deleteChangeById($event)"></app-changes>`,
  styleUrl: './changes.component.scss'
})
export class ChangesPresenter implements OnInit {

  ds: ChangeModel[] = [];
  filterOptions: ChangeFilterOption[] = [];
  selectedFilter: ChangeFilterOption | null = null;

  constructor(private modelService: ModelService) {}

  ngOnInit(){
   this.loadFilterOptions()
  }

  loadFilterOptions() {
    this.modelService.getChangeFilterOptions().subscribe({
      next: (options) => {
        this.filterOptions = options;
        const defaultFilter = options.find((option) => option.type === 'current') ?? options[0] ?? null;
        this.selectedFilter = defaultFilter;
        if (defaultFilter) {
          this.loadChange(defaultFilter);
        } else {
          this.loadChange();
        }
      },
      error: () => {
        this.filterOptions = [];
        this.selectedFilter = null;
        this.loadChange();
      }
    })
  }

  loadChange(filter?: ChangeFilterOption) {
    const params = this.mapFilterToParams(filter);

    this.modelService.getChange(params).subscribe({
      next: (data) => {
        this.ds = data
        console.log("Changes List DS:", this.ds)
      }
    })
  }

  onFilterChange(option: ChangeFilterOption) {
    this.selectedFilter = option;
    this.loadChange(option);
  }

  private mapFilterToParams(filter?: ChangeFilterOption): ChangeQueryParams | undefined {
    if (!filter) {
      return undefined;
    }

    if (filter.type === 'current') {
      return { current_only: true, archived: false };
    }

    if (filter.type === 'version' && filter.app && filter.version) {
      return { app: filter.app, version: filter.version };
    }

    return undefined;
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
                       if (this.selectedFilter) {
                         this.loadChange(this.selectedFilter);
                       } else {
                         this.loadChange();
                       }
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
