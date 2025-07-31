import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-form',
  standalone: true,
  imports: [],
  templateUrl: './app-form.component.html',
  styleUrl: './app-form.component.scss'
})
export class AppFormComponent {

  constructor(private router: Router) {}

  onClose() {
    this.router.navigate(['/Apps']);
  }

  onCancel() {
    this.router.navigate(['/Apps']);
  }
}
