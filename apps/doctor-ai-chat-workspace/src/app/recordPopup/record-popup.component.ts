import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXPopupModule, AXPopupService } from '@acorex/components/popup';
import { AXButtonModule } from '@acorex/components/button';
import { AIService } from '../../service/ai.service';
import { Router } from '@angular/router';
import { AXBasePageComponent } from '@acorex/components/page';

@Component({
  selector: 'app-record-popup',
  standalone: true,
  imports: [CommonModule, AXPopupModule, AXButtonModule],
  templateUrl: './record-popup.component.html',
  providers: [AIService],
})
export class RecordPopupComponent extends AXBasePageComponent {
  private popup: AXPopupService = inject(AXPopupService);
  private aiService: AIService = inject(AIService);
  private router: Router = inject(Router);

  isRecording = false;
  loading = false;
  private mediaRecorder!: MediaRecorder;
  private audioChunks: Blob[] = [];

  async toggleRecording() {
    this.isRecording = !this.isRecording;

    if (this.isRecording) {
      console.log('🎙️ ضبط شروع شد...');

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        this.mediaRecorder = new MediaRecorder(stream);
        this.audioChunks = [];

        this.mediaRecorder.ondataavailable = (event) => {
          this.audioChunks.push(event.data);
        };

        this.mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
          const audioFile = this.uploadAudio(audioBlob);

          const sampleChatBody = {
            media: audioFile,
            model_id: '05f2b789-be71-4cc2-b8f6-0a7b62a312e8',
          };

          this.loading = true;
          try {
            const response = await this.aiService.chat(sampleChatBody);
            // console.log(' پاسخ از chat:', response);
            this.close(response);
            // this.router.navigate(['/chat'], {
            //   state: { chatData: response },
            // });
          } catch (error) {
            console.error(' خطا در ارسال به chat:', error);
          } finally {
            this.loading = false;
          }
        };

        this.mediaRecorder.start();
      } catch (error) {
        console.error(' خطا در دسترسی به میکروفون:', error);
      }
    } else {
      console.log(' ضبط متوقف شد.');
      this.mediaRecorder?.stop();
    }
  }

  uploadAudio(audioBlob: Blob) {
    const audioFile = new File([audioBlob], 'recording.wav', {
      type: 'audio/wav',
      lastModified: Date.now(),
    });
    return audioFile;
  }
}
