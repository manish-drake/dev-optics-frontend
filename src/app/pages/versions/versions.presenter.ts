import { Component, OnInit } from '@angular/core';
import { VersionsComponent } from "./versions.component";
import { VersionModel } from '../../services/model-interface/interfaces';
import { ModelService } from '../../services/model-services/model.service';

@Component({
  selector: 'app-versions-presenter',
  standalone: true,
  imports: [VersionsComponent],
  template: `<app-versions [datasource]="ds"></app-versions>`,
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
}
