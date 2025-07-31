import { Component } from '@angular/core';
import { ChangeFormComponent } from "./change-form.component";

@Component({
  selector: 'app-change-form-presenter',
  standalone: true,
  imports: [ChangeFormComponent],
  template: `<app-change-form></app-change-form>`,
  styleUrl: './change-form.component.scss'
})
export class ChangeFormPresenter {

}
