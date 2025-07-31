import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-app-cards',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app-cards.component.html',
  styleUrl: './app-cards.component.scss'
})
export class AppCardsComponent {

  @Input() datasource: any;

  deleteApp() {
throw new Error('Method not implemented.');
}

}
