import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppCardsComponent } from "./components/app-cards/app-cards.component";


@Component({
  selector: 'app-apps',
  standalone: true,
  imports: [CommonModule, RouterModule, AppCardsComponent],
  templateUrl: './apps.component.html',
  styleUrl: './apps.component.scss'
})
export class AppsComponent {

  @Input() datasource: any;

  
addNewApp() {
throw new Error('Method not implemented.');
}

editApp() {
throw new Error('Method not implemented.');
}
viewVersions() {
throw new Error('Method not implemented.');
}

}
