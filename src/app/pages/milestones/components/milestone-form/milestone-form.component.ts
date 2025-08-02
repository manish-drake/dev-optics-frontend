import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-milestone-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './milestone-form.component.html',
  styleUrl: './milestone-form.component.scss'
})
export class MilestoneFormComponent {
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
    this.router.navigate(['/milestones']);
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
        this.router.navigate(['/milestones']);
      }
    });
  }

}
