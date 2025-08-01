import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VersionCardsComponent } from "./components/version-cards/version-cards.component";

@Component({
  selector: 'app-versions',
  standalone: true,
  imports: [CommonModule, RouterModule, VersionCardsComponent],
  templateUrl: './versions.component.html',
  styleUrl: './versions.component.scss'
})
export class VersionsComponent {
  @Input() datasource: any;
  @Output() deleteVersion = new EventEmitter<number>();
createVersion() {
throw new Error('Method not implemented.');
}
editVersion() {
throw new Error('Method not implemented.');
}
deployVersion() {
throw new Error('Method not implemented.');
}

onDelete(id: number) {
   this.deleteVersion.emit(id);
}




}
