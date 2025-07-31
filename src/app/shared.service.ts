import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface TabBehavior {
  isTab: boolean;
  isSelectButton: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

   private isTabs = new BehaviorSubject<TabBehavior>({
    isTab: true,
    isSelectButton: false,
  });

  boolValue$ = this.isTabs.asObservable();


  updateTabState(value: TabBehavior) {
    console.log('Current State:', this.isTabs.getValue()); // Log the current state
    this.isTabs.next(value); // Update state
  }
}
