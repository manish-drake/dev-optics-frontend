import { Component, OnInit } from '@angular/core';
import { ChangesDetailCardComponent } from "./changes-detail-card.component";
import { ModelService } from '../../../../services/model-services/model.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

export interface IssueImage {
  url: string;
  caption?: string;
}


@Component({
  selector: 'app-changes-detail-card-presenter',
  standalone: true,
  imports: [CommonModule, ChangesDetailCardComponent],
  template: `<app-changes-detail-card *ngIf="ds"  [datasource]="ds"></app-changes-detail-card>`,
  styleUrls: ['./changes-detail-card.component.scss']
})
export class ChangesDetailCardPresenter implements OnInit {

  ds: {};


//   issue: Issue = {
//     id: "BUG-2024-001",
//     title: "Import Roster feature not working in Event Form and Team Form",
//     version: "0.0.0",
//     status: "bug",
//     priority: "high",
//     description: `While using the Event Form, when navigating to the Team Info section, clicking on "Import Roster" does not add players as expected. The button appears to be functional but no data is loaded into the form.

// This issue is affecting multiple users and preventing them from efficiently managing team rosters during event setup.`,


//     appName: "fullstack",
//     developer: "Aryan Vyawahare, Vikas Rana",
//     date: "10/07/2025 01:00 pm",
//     images: [
   
//       {
//         url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
//       },
     
//     ],

//   };
  

  constructor(private modelService: ModelService, private route: ActivatedRoute) { 
    this.ds = {};
  }

  logId: number = 0;
  ngOnInit(): void {
    // this.loadIssueData();
    this.route.params.subscribe((params)=> {
      this.logId = params['id'];
    this.getSingleChange(this.logId);
  })
  }

 
getSingleChange(id: number) {
  this.modelService.getSingleChange(id).subscribe({
    next: (data) => {
      // console.log('Single Change DS:', data);
      this.ds = data;
      console.log('Single Change DS:', this.ds);
    },
    error: (err) => {
      console.error('Error fetching change:', err);
    }
  });
}

}
