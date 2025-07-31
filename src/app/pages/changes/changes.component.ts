import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-changes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './changes.component.html',
  styleUrl: './changes.component.scss'
})
export class ChangesComponent {

}
