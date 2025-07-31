import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-apps',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './apps.component.html',
  styleUrl: './apps.component.scss'
})
export class AppsComponent {

  @Input() datasource: any;

  
addNewApp() {
throw new Error('Method not implemented.');
}
deleteApp() {
throw new Error('Method not implemented.');
}
editApp() {
throw new Error('Method not implemented.');
}
viewVersions() {
throw new Error('Method not implemented.');
}

}
