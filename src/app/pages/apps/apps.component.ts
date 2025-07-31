import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() deleteApp = new EventEmitter<number>()

  
addNewApp() {
throw new Error('Method not implemented.');
}
onDelete(id: number){
  this.deleteApp.emit(id)
  console.log("Delete Child Id", id)
}

editApp() {
throw new Error('Method not implemented.');
}
viewVersions() {
throw new Error('Method not implemented.');
}

}
