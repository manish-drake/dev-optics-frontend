import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-deployment-cards',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './deployment-cards.component.html',
  styleUrls: ['./deployment-cards.component.scss']
})
export class DeploymentCardsComponent {
  @Input() datasource: any;
  @Output() deployDelete = new EventEmitter<number>();

  constructor(private router: Router) {}

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

    Swal.fire({
      title: 'Change Log',
      html: `
        <style>
          .image-placeholder {
            background: #f8f9fa;
            border: 2px dashed #dee2e6;
            padding: 20px;
            margin: 10px 0;
            text-align: center;
            color: #6c757d;
            font-style: italic;
            border-radius: 4px;
          }
          .changelog-item {
            margin-bottom: 20px;
            text-align: left;
            line-height: 1.5;
          }
          .changelog-index {
            font-weight: bold;
            color: #007bff;
            margin-right: 8px;
          }
          .changelog-separator {
            margin: 20px 0;
            border: none;
            border-top: 1px solid #dee2e6;
          }
          #changelog-content {
            max-height: 500px;
            overflow-y: auto;
            padding: 0 10px;
          }
        </style>
        <div id="changelog-content">${numberedLogs}</div>
      `,
      width: '900px',
      showDenyButton: true,
      confirmButtonText: 'Close',
      confirmButtonColor: '#dc3545',
      denyButtonText: 'Download PDF',
      denyButtonColor: '#28a745',
    }).then(result => {
      if (result.isDenied) this.downloadPDF();
    });
  }

  // SOLUTION 2: Alternative with image URL text
  showFullChangeLogWithImageUrls(changeLog: string) {

    // Replace --- with line break (split into sections)
  let logs = changeLog.split(/---/g).map(l => l.trim()).filter(l => l);

  // Add numbering to each log
  let numberedLogs = logs.map((log, index) => {
    let formatted = log;

    // Convert markdown bold **text** → <b>text</b>
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

    // Convert markdown image ![alt](url) → <img src="url">
    formatted = formatted.replace(/!\[.*?\]\((.*?)\)/g, '<br><img src="$1" style="max-width:100%; margin:8px 0;"><br>');

    return `<div class="changelog-item" style="margin-bottom:12px;">
              <span class="changelog-index" style="font-weight:bold; color:#000;">${index + 1}.</span> ${formatted}
            </div>`;
  }).join('<hr class="changelog-separator" />');

    Swal.fire({
      title: 'Change Log',
      html: `
        <style>
          .image-link {
            background: #e3f2fd;
            border-left: 4px solid #2196f3;
            padding: 10px;
            margin: 10px 0;
            font-size: 14px;
            border-radius: 4px;
          }
          .image-link a {
            color: #1976d2;
            text-decoration: none;
            word-break: break-all;
          }
          .image-link a:hover {
            text-decoration: underline;
          }
          .changelog-item {
            margin-bottom: 20px;
            text-align: left;
            line-height: 1.5;
          }
          .changelog-index {
            font-weight: bold;
            color: #007bff;
            margin-right: 8px;
          }
          .changelog-separator {
            margin: 20px 0;
            border: none;
            border-top: 1px solid #dee2e6;
          }
          #changelog-content {
            max-height: 500px;
            overflow-y: auto;
            padding: 0 10px;
          }
        </style>
        <div id="changelog-content">${numberedLogs}</div>
      `,
      width: '900px',
      showDenyButton: true,
      confirmButtonText: 'Close',
      confirmButtonColor: '#dc3545',
      denyButtonText: 'Download PDF',
      denyButtonColor: '#28a745',
    }).then(result => {
      if (result.isDenied) this.downloadPDF();
    });
  }

  // SOLUTION 3: Pure jsPDF without html2canvas (no images needed)
  private async downloadPDFTextOnly() {
    try {
      const changelogDiv = document.getElementById('changelog-content');
      if (!changelogDiv) return;

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const lineHeight = 6;
      let yPosition = margin;

      // Add title
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Change Log', margin, yPosition);
      yPosition += lineHeight * 2;

      // Get all changelog items
      const items = changelogDiv.querySelectorAll('.changelog-item');
      const itemsArray = Array.from(items);

      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');

      for (let i = 0; i < itemsArray.length; i++) {
        const item = itemsArray[i];
        
        // Extract text content and clean it
        let text = item.textContent || '';
        text = text.replace(/\s+/g, ' ').trim(); // Clean up whitespace
        
        // Check if we need a new page
        const textLines = pdf.splitTextToSize(text, pageWidth - 2 * margin);
        const neededHeight = textLines.length * lineHeight + 10; // Extra space for separator
        
        if (yPosition + neededHeight > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }

        // Add the text
        pdf.text(textLines, margin, yPosition);
        yPosition += textLines.length * lineHeight;

        // Add separator line
        if (i < itemsArray.length - 1) {
          yPosition += 5;
          pdf.setDrawColor(200, 200, 200);
          pdf.line(margin, yPosition, pageWidth - margin, yPosition);
          yPosition += 10;
        }
      }

      pdf.save('changelog.pdf');
      
    } catch (error) {
      console.error('PDF generation failed:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to generate PDF. Please try again.',
        icon: 'error'
      });
    }
  }

  // Simplified html2canvas approach (your current method but cleaner)
  private async downloadPDF() {
    try {
      const changelogDiv = document.getElementById('changelog-content');
      if (!changelogDiv) return;

      // Show loading
      Swal.fire({
        title: 'Generating PDF...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const clone = changelogDiv.cloneNode(true) as HTMLElement;
      
      // Style the clone for better PDF output
      clone.style.cssText = `
        max-height: unset !important;
        overflow: visible !important;
        padding: 20px !important;
        background: white !important;
        width: 800px !important;
        font-family: Arial, sans-serif !important;
        line-height: 1.6 !important;
        color: #333 !important;
      `;

      // Remove any broken images
      const brokenImages = clone.querySelectorAll('img');
      Array.from(brokenImages).forEach(img => {
        const placeholder = document.createElement('div');
        placeholder.style.cssText = `
          background: #f8f9fa;
          border: 2px dashed #dee2e6;
          padding: 15px;
          text-align: center;
          color: #6c757d;
          font-style: italic;
          margin: 10px 0;
          border-radius: 4px;
        `;
        placeholder.textContent = '[Image not available in PDF]';
        img.parentNode?.replaceChild(placeholder, img);
      });

      // Create temporary container
      const tempWrapper = document.createElement('div');
      tempWrapper.style.cssText = `
        position: fixed;
        top: -9999px;
        left: 0;
        z-index: -1000;
        background: white;
      `;
      document.body.appendChild(tempWrapper);
      tempWrapper.appendChild(clone);

      // Generate canvas
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: false,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        removeContainer: true,
        imageTimeout: 5000
      });

      // Clean up
      document.body.removeChild(tempWrapper);

      // Generate PDF
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4'
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth - 40; // 20px margin on each side
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let position = 20; // Top margin
      pdf.addImage(imgData, 'PNG', 20, position, imgWidth, imgHeight);

      // Add more pages if content is longer than one page
      let remainingHeight = imgHeight - (pageHeight - 40);
      while (remainingHeight > 0) {
        pdf.addPage();
        position = -remainingHeight + 20;
        pdf.addImage(imgData, 'PNG', 20, position, imgWidth, imgHeight);
        remainingHeight -= (pageHeight - 40);
      }

      pdf.save('changelog.pdf');
      Swal.close();
      
    } catch (error) {
      console.error('PDF generation failed:', error);
      Swal.close();
      // Fallback to text-only PDF
      this.downloadPDFTextOnly();
    }
  }

  onDeleteDeployment(id: number) {
    this.deployDelete.emit(id);
  }

  formatDateAndTime(input: string): string {
    const date = new Date(input);
    if (isNaN(date.getTime())) return 'Invalid Date';

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

  formatTimeOnly(input: string): string {
    const date = new Date(input);
    if (isNaN(date.getTime())) return 'Invalid Time';

    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  }
}