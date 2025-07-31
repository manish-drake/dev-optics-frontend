import { Component } from '@angular/core';
import { VersionFormComponent } from "./version-form.component";

@Component({
  selector: 'app-version-form-presenter',
  standalone: true,
  imports: [VersionFormComponent],
  template: `<app-version-form></app-version-form>`,
  styleUrl: './version-form.component.scss'
})
export class VersionFormPresenter {

}
