import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-form',
  standalone: true,
  imports: [],
  templateUrl: './change-form.component.html',
  styleUrl: './change-form.component.scss'
})
export class ChangeFormComponent {
   constructor(private router: Router) {}
  
    onClose() {
      this.router.navigate(['/change']);
    }
  
    onCancel() {
      this.router.navigate(['/change']);
    }
}
