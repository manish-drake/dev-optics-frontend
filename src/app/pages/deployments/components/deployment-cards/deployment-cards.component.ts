import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';

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
    // Split logs by ---
    let logs = changeLog.split(/---/g).map(l => l.trim()).filter(l => l);

    // Add numbering + formatting
    let numberedLogs = logs.map((log, index) => {
      let formatted = log;

      // Bold markdown
      formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

      // Images with styling
      formatted = formatted.replace(
        /!\[.*?\]\((.*?)\)/g,
        `<div style="text-align:center; margin:10px 0;">
           <img src="$1" style="max-width:100%; height:auto; border:1px solid #ccc; border-radius:6px;">
         </div>`
      );

      return `<div style="margin-bottom:16px; font-size:13px; line-height:1.6;">
                <span style="font-weight:bold; color:#333;">${index + 1}.</span> ${formatted}
              </div>`;
    }).join('<hr style="border:0; border-top:1px solid #ddd; margin:12px 0;">');

    // SweetAlert modal
    Swal.fire({
      title: 'Change Log',
      html: `<div style="max-height:500px; overflow-y:auto; text-align:left; line-height:1.6">
               ${numberedLogs}
             </div>`,
      width: '900px',
      showDenyButton: true, // ✅ Add download button
      confirmButtonText: 'Close',
      confirmButtonColor: '#dc3545',
      denyButtonText: 'Download PDF',
      denyButtonColor: '#28a745',
    }).then((result) => {
      if (result.isDenied) {
        this.downloadPDF(numberedLogs);
      }
    });
  }

  // ✅ PDF generation with text + images
  private async downloadPDF(logsHtml: string) {
    const doc = new jsPDF({
      orientation: "p",
      unit: "pt",
      format: "a4"
    });

    let y = 60; // starting Y position

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Change Log", doc.internal.pageSize.getWidth() / 2, y, { align: "center" });
    y += 30;

    // Parse logs into a DOM
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = logsHtml;
    const logs = tempDiv.querySelectorAll("div");

    for (let i = 0; i < logs.length; i++) {
      const log = logs[i];

      // Text content
      const textContent = log.innerText.replace(/\s+/g, " ").trim();
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);

      const splitText = doc.splitTextToSize(textContent, 500);
      doc.text(splitText, 40, y);
      y += splitText.length * 14 + 10;

      // Handle images inside the log
      const imgTags = log.querySelectorAll("img");
      for (let img of Array.from(imgTags)) {
        const src = img.getAttribute("src");
        if (src) {
          try {
            const base64 = await this.getBase64ImageFromUrl(src);
            const imgProps = doc.getImageProperties(base64);
            const pdfWidth = 300; // image width
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            if (y + pdfHeight > doc.internal.pageSize.getHeight() - 40) {
              doc.addPage();
              y = 40;
            }

            doc.addImage(base64, "PNG", 40, y, pdfWidth, pdfHeight);
            y += pdfHeight + 20;
          } catch (e) {
            console.warn("Could not load image:", src, e);
          }
        }
      }

      // Add spacing between logs
      y += 10;

      // Page break if content overflows
      if (y > doc.internal.pageSize.getHeight() - 60) {
        doc.addPage();
        y = 40;
      }
    }

    doc.save("changelog.pdf");
  }

  // ✅ Convert image URL → Base64
  private getBase64ImageFromUrl(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = url;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL("image/png"));
        } else {
          reject("Canvas not supported");
        }
      };

      img.onerror = () => reject("Failed to load image: " + url);
    });
  }

  onDeleteDeployment(id: number) {
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
