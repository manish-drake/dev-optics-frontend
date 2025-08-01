import { CommonModule, Location } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-version-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './version-form.component.html',
  styleUrl: './version-form.component.scss'
})
export class VersionFormComponent {

  @Input() app : any;

  @Input() form!: FormGroup;
  @Output() formSubmit = new EventEmitter<void>();
  @Input() editMode: boolean = false;
  constructor(private router: Router, private location: Location) { }

  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit();
    }
  }
  onClose() {
    this.router.navigate(['/versions']);
  }

  onCancel() {
    this.router.navigate(['/versions']);
  }
}
