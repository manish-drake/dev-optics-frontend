import { Component, Input, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Issue } from './changes-detail-card.presenter';
import { Router } from '@angular/router';
// import { Issue } from './changes-detail-card-presenter.component';

@Component({
  selector: 'app-changes-detail-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './changes-detail-card.component.html',
  styleUrls: ['./changes-detail-card.component.scss']
})
export class ChangesDetailCardComponent implements OnDestroy {
  @Input() issue!: Issue;
  @Input() datasource: any;
  
  // Modal state
  selectedImage: string | null = null;
  isModalOpen: boolean = false;
  private originalBodyOverflow: string = '';

  constructor( private router: Router) { 
    console.log('datasource:', this.datasource);
  }

  // Status styling methods
  getStatusColor(status: string): string {


    const statusMap: { [key: string]: string } = {
      'bug': 'status-bug',
      'feature': 'status-feature',
      'tweaks': 'status-tweaks',
      'refactoring': 'status-refactoring',
      'breaking': 'status-breaking',
     
    };
    return statusMap[status.toLowerCase()] || 'status-default';
    
  }

  getStatusIcon(status: string): string {
    const iconMap: { [key: string]: string } = {
      'tweaks': '🔧',
      'bug': '🐛',
      'feature': '✨',
      'refactoring': '✅',
      'breaking': '💥',
    };
    return iconMap[status.toLowerCase()] || '⚠️';
  }

  // getPriorityColor(priority: string | undefined): string {
  //   if (!priority) return 'priority-default';
    
  //   const priorityMap: { [key: string]: string } = {
  //     'high': 'priority-high',
  //     'medium': 'priority-medium',
  //     'low': 'priority-low',
  //     'critical': 'priority-critical'
  //   };
  //   return priorityMap[priority.toLowerCase()] || 'priority-default';
  // }

  // Image modal methods
  openImageModal(imageSrc: string): void {
    this.selectedImage = imageSrc;
    this.isModalOpen = true;
    this.originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }

  closeImageModal(): void {
    this.isModalOpen = false;
    this.selectedImage = null;
    
    // Restore body scroll
    document.body.style.overflow = this.originalBodyOverflow;
  }

  onModalBackdropClick(event: MouseEvent): void {
    // Close modal when clicking on backdrop (not the image)
    if (event.target === event.currentTarget) {
      this.closeImageModal();
    }
  }

  // Handle escape key to close modal
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    if (this.isModalOpen) {
      this.closeImageModal();
    }
  }



  // Utility methods
  trackByIndex(index: number, item: any): number {
    return index;
  }

  formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString();
    } catch {
      return dateString; // Return original string if parsing fails
    }
  }

  copyIssueUrl(): void {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      console.log('Issue URL copied to clipboard');
      // You could show a toast notification here
    });
  }

  // Cleanup on component destroy
  ngOnDestroy(): void {
    // Restore body overflow if component is destroyed while modal is open
    if (this.isModalOpen) {
      document.body.style.overflow = this.originalBodyOverflow;
    }
  }

  // Additional utility methods for future enhancements
  downloadImage(imageUrl: string, filename?: string): void {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename || 'issue-screenshot.png';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  shareIssue(): void {
    if (navigator.share) {
      navigator.share({
        title: this.issue.title,
        text: `Issue #${this.issue.id}: ${this.issue.title}`,
        url: window.location.href
      });
    } else {
      this.copyIssueUrl();
    }
  }

  // Method to handle image loading errors
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/placeholder-error.png'; // Fallback image
    console.warn('Failed to load image:', img.src);
  }



  goBack(): void {
  this.router.navigate(['/change']); 
}
}