import { Component } from '@angular/core';
import { ChangesComponent } from "./changes.component";

@Component({
  selector: 'app-changes-presenter',
  standalone: true,
  imports: [ChangesComponent],
  template: `<app-changes></app-changes>`,
  styleUrl: './changes.component.scss'
})
export class ChangesPresenter {

}
