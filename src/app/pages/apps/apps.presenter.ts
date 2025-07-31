import { Component } from '@angular/core';
import { AppsComponent } from "./apps.component";

@Component({
  selector: 'app-apps-presenter',
  standalone: true,
  imports: [AppsComponent],
  template: `<app-apps></app-apps>`,
  styleUrl: './apps.component.scss'
})
export class AppsPresenter {

}
