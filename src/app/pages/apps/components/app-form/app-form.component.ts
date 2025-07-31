import { CommonModule, Location } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-app-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule  ],
  templateUrl: './app-form.component.html',
  styleUrl: './app-form.component.scss'
})
export class AppFormComponent {

 @Input() form!: FormGroup;
  @Output() formSubmit = new EventEmitter<void>();
  @Input() editMode: boolean = false;

  constructor(private location: Location) {}

  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit();
    }
  }

  onClose(): void {
    this.location.back();
  }

}
