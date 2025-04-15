import { AXBasePageComponent } from '@acorex/components/page';
import { AXPopupService } from '@acorex/components/popup';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecordPopupComponent } from '../recordPopup/record-popup.component';

@Component({
  templateUrl: './detail-patient.component.html',
  styleUrls: ['./detail-patient.component.scss'],
  providers: [],
  imports: [FormsModule],
})
export class PatientDetailComponent extends AXBasePageComponent {
  router: any;
  recordPopup() {
    this.popup.open(RecordPopupComponent, ' شروع مکالمه').then((result) => {
      if (result.data) {
        this.close(result.data);
      }
    });
  }
  patientNationalCode: any;
  patientBirthDate: any;
  checkPatientInfo() {
    throw new Error('Method not implemented.');
  }
  profileName: any;
  profileDescription: any;
  aIService: any;

  private popup: AXPopupService = inject(AXPopupService);

  profiles = signal<any[]>([]);

  constructor() {
    super();
    this.loadProfiles();
  }

  async loadProfiles() {
    // thi);
  }

  selectedProfileId: string | null = null;

  onProfileClick(profile: any) {
    this.selectedProfileId = profile.id;
    console.log('Selected Profile ID:', this.selectedProfileId);
    this.close(profile);
  }

  onSubmit(): void {
    if (this.profileName && this.profileDescription) {
      const newProfile = {
        name: this.profileName,
        description: this.profileDescription,
      };
      this.aIService.createAgent(newProfile).subscribe();
      this.close();
    }
  }
}
