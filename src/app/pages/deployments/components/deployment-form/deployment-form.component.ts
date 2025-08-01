import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deployment-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './deployment-form.component.html',
  styleUrl: './deployment-form.component.scss'
})
export class DeploymentFormComponent {
  @Input() app: any;
 @Input() form!: FormGroup;
  @Output() formSubmit = new EventEmitter<void>();
  @Input() editMode: boolean = false;
  constructor(private router: Router) { }

  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit();
    }
  }
  
    onClose() {
      this.router.navigate(['/deployment']);
    }
  
    onCancel() {
      this.router.navigate(['/deployment']);
    }
}
