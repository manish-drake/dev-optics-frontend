import { CommonModule, Location } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-version-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './version-form.component.html',
  styleUrl: './version-form.component.scss'
})
export class VersionFormComponent {

  @Input() app: any;

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
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to Discard changes",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/versions']);
      }
    });
  }
}
