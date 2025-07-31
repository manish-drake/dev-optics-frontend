  import { Component } from '@angular/core';
  import { AppFormComponent } from "./app-form.component";

  @Component({
    selector: 'app-app-form-presenter',
    standalone: true,
    imports: [AppFormComponent],
    template: `<app-app-form></app-app-form>`,
    styleUrl: './app-form.component.scss'
  })
  export class AppFormPresenter {

  }
