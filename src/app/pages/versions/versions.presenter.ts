import { Component } from '@angular/core';
import { VersionsComponent } from "./versions.component";

@Component({
  selector: 'app-versions-presenter',
  standalone: true,
  imports: [VersionsComponent],
  template: `<app-versions></app-versions>`,
  styleUrl: './versions.component.scss'
})
export class VersionsPresenter {

}
