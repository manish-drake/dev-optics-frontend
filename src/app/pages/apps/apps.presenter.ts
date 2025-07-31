import { Component, OnInit } from '@angular/core';
import { AppsComponent } from "./apps.component";
import { AppModel } from '../../services/model-interface/interfaces';
import { ModelService } from '../../services/model-services/model.service';

@Component({
  selector: 'app-apps-presenter',
  standalone: true,
  imports: [AppsComponent],
  template: `<app-apps [datasource]="ds"></app-apps>`,
  styleUrl: './apps.component.scss'
})
export class AppsPresenter implements OnInit {

  ds : AppModel[] = []

  constructor(private modelService: ModelService) {

  }

  ngOnInit(){
   this.loadApps()
  }

  loadApps(){
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
}
