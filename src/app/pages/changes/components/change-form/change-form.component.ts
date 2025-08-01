import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './change-form.component.html',
  styleUrl: './change-form.component.scss'
})
export class ChangeFormComponent {

   @Input() category: any;
   @Input() app : any;
   @Input() form !: FormGroup;
   @Output() formSubmit = new EventEmitter<void>();
   @Input() editMode: boolean = false;

   constructor(private router: Router) {}

   onSubmit(): void {
    if(this.form.valid) {
      this.formSubmit.emit();
    }
   }
  
    onClose() {
      this.router.navigate(['/change']);
    }
  
    onCancel() {
      this.router.navigate(['/change']);
    }
}
