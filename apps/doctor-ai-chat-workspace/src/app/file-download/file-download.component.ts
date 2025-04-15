import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-download',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-download.component.html',
})
export class FileDownloadComponent {
  @Input() document: any;

  constructor(private http: HttpClient) {}

  downloadFile(url: string, fileName: string): void {
    this.http.get(url, { responseType: 'blob' }).subscribe(
      (response) => {
        const blob = new Blob([response], { type: 'application/octet-stream' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
      },
      (error) => {
        console.error('خطا در دانلود فایل:', error);
      }
    );
  }
}
