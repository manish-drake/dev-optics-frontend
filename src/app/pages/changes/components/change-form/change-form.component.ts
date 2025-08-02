import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ModelService } from '../../../../services/model-services/model.service';

@Component({
  selector: 'app-change-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './change-form.component.html',
  styleUrl: './change-form.component.scss'
})
export class ChangeFormComponent {
  @Input() imageUrl: string | null = null; 

  @Input() category: any;
  @Input() app: any;
  @Input() form !: FormGroup;
  @Output() formSubmit = new EventEmitter<void>();
  @Input() editMode: boolean = false;
  @Output() file = new EventEmitter<any>()

  constructor(private router: Router, private modelService: ModelService) { }

  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit();
    }
  }

  
  onFileSelected(event: any): void {
   this.file.emit(event)
  }

  onClose() {
    this.router.navigate(['/change']);
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
        this.router.navigate(['/change']);
      }
    });
  }
}
