import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  activeTab: string = 'Apps';
  isTab: boolean = true;
  isSelectButton: boolean = false;
  constructor(private router: Router, private route: ActivatedRoute, private sharingService: SharedService){}


  setActiveTab(tab: string) {
    this.router.navigate([`${tab}`]);
    this.activeTab = tab;
  }

  ngOnInit(): void {
       this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const fullUrl = event.url;
        const urlParts = fullUrl.split('/');
        if (urlParts.length >= 2) {
          const desiredSegment = urlParts[1];
          console.log(desiredSegment);
          this.activeTab = desiredSegment;
        } else {
          this.activeTab = 'Apps';
        }
      }
    });
    this.sharingService.boolValue$.subscribe((tabBehavior) => {
      console.log(tabBehavior);
      this.isTab = tabBehavior.isTab;
      this.isSelectButton = tabBehavior.isSelectButton;
    });
  }
}