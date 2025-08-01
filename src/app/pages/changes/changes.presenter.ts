import { Component, OnInit } from '@angular/core';
import { ChangesComponent } from "./changes.component";
import { ChangeModel } from '../../services/model-interface/interfaces';
import { ModelService } from '../../services/model-services/model.service';

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
     this.modelService.deleteChange(id).subscribe({
      next: (data) => {
        console.log("Deleted successfully", data)
      },
      error: (err) => console.log('Delete Error :', err)
     })
  }

}
