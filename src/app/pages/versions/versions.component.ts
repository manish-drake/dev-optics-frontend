import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-versions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './versions.component.html',
  styleUrl: './versions.component.scss'
})
export class VersionsComponent {
createVersion() {
throw new Error('Method not implemented.');
}
editVersion() {
throw new Error('Method not implemented.');
}
deployVersion() {
throw new Error('Method not implemented.');
}




}
