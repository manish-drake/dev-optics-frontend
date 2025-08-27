import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deployment-cards',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './deployment-cards.component.html',
  styleUrl: './deployment-cards.component.scss'
})
export class DeploymentCardsComponent {
  @Input() datasource: any;
  @Output() deployDelete = new EventEmitter<number>();

   constructor(private router: Router) {
  
    }

    
 showFullChangeLog(changeLog: string) {
  // Replace --- with line break (split into sections)
  let logs = changeLog.split(/---/g).map(l => l.trim()).filter(l => l);

  // Add numbering to each log
  let numberedLogs = logs.map((log, index) => {
    let formatted = log;

    // Convert markdown bold **text** → <b>text</b>
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

    // Convert markdown image ![alt](url) → <img src="url">
    formatted = formatted.replace(/!\[.*?\]\((.*?)\)/g, '<br><img src="$1" style="max-width:100%; margin:8px 0;"><br>');

    return `<div style="margin-bottom:12px;">
              <span style="font-weight:bold; color:#000;">${index + 1}.</span> ${formatted}
            </div>`;
  }).join('<hr>');

  // Show in SweetAlert
  Swal.fire({
    title: 'Change Log',
    html: `<div style="max-height:500px; overflow-y:auto; text-align:left; line-height:1.6">
             ${numberedLogs}
           </div>`,
    width: '900px',
    confirmButtonText: 'Close',
    confirmButtonColor: '#dc3545',

  });
}


    onDeleteDeployment(id: number){
      this.deployDelete.emit(id);
    }

   formatDateAndTime(input: string): string {
  const date = new Date(input);

  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  const datePart = date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const timePart = date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return `${datePart} ${timePart}`;
}
}
