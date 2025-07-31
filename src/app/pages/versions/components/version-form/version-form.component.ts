import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-version-form',
  standalone: true,
  imports: [],
  templateUrl: './version-form.component.html',
  styleUrl: './version-form.component.scss'
})
export class VersionFormComponent {
constructor(private router: Router) {}
  
    onClose() {
      this.router.navigate(['/versions']);
    }
  
    onCancel() {
      this.router.navigate(['/versions']);
    }
}
