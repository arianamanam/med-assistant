import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXPopupModule, AXPopupService } from '@acorex/components/popup';
import { PatientDetailComponent } from '../detail-patient/detail-patient.component';
import { AXButtonModule } from '@acorex/components/button';
import { AIService } from '../../service/ai.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-patient',
  standalone: true,
  imports: [CommonModule, AXPopupModule, AXButtonModule],
  templateUrl: './new-patient.component.html',
  providers: [AIService],
})
export class NewPatientComponent implements OnInit {
  patientHistory: any[] = [];
  private popup: AXPopupService = inject(AXPopupService);
  private conversationService: AIService = inject(AIService);
  router: Router = inject(Router);

  ngOnInit(): void {
    this.loadPatientHistory();
  }

  loadPatientHistory(): void {
    this.conversationService
      .conversationList()
      .then((response: any) => {
        this.patientHistory = response.sessions;
        //  response.sessions.map((conversation: any) => {
        //   const date = new Date(conversation.created_at);
        //   const day = String(date.getDate()).padStart(2, '0');
        //   const month = String(date.getMonth() + 1).padStart(2, '0');
        //   const year = date.getFullYear();

        //   const formattedDate = `${year}/${month}/${day}`;
        //   return `${formattedDate} - ${conversation.first_message}`;
        // });
        // console.log(this.patientHistory);
      })
      .catch((error) => {
        console.error('خطا در بارگذاری تاریخچه:', error);
      });
  }
  trackByIndex(index: number): number {
    return index;
  }

  goToChat(selectedPatientMessage: any) {
    this.router.navigate(['/chat'], {
      state: { chatData: selectedPatientMessage },
    });
  }

  startSession() {
    this.popup.open(PatientDetailComponent, 'اطلاعات بیمار').then((result) => {
      if (result.data) {
        this.router.navigate(['/chat'], {
          state: { chatData: result.data },
        });
      }
    });
  }
}
