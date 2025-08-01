import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-version-cards',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './version-cards.component.html',
  styleUrl: './version-cards.component.scss'
})
export class VersionCardsComponent {

  @Input() datasource: any;
  @Output() versionDelete = new EventEmitter<number>()

  constructor(private router: Router) {

  }

  deleteVersion(id: number){
    this.versionDelete.emit(id);
  }

}
