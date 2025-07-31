import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deployment-form',
  standalone: true,
  imports: [],
  templateUrl: './deployment-form.component.html',
  styleUrl: './deployment-form.component.scss'
})
export class DeploymentFormComponent {
constructor(private router: Router) {}
  
    onClose() {
      this.router.navigate(['/deployment']);
    }
  
    onCancel() {
      this.router.navigate(['/deployment']);
    }
}
