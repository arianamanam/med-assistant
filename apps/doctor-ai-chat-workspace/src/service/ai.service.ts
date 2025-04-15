import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable()
export class AIService {
  createChat(newChat: {
    patientName: string;
    nationalCode: string;
    summary: string;
    creatorId: number | undefined;
  }) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private http: HttpClient,
    @Inject('env') private environment: any
  ) {}

  createAgent(profileData: any): Observable<any> {
    const formData = new FormData();
    for (const key in profileData) {
      formData.set(key, profileData[key]);
    }
    return this.http.post(
      `${this.environment.endpoints.base}/core/agents/create/`,
      formData
    );
  }

  agents() {
    return lastValueFrom(
      this.http.get(`${this.environment.endpoints.base}/core/agents/`)
    );
  }

  chat(formData: any) {
    let body: any;
    if (formData.media) {
      body = new FormData();
      for (const key in formData) {
        if (key != 'plugin_ids') body.set(key, formData[key]);
      }
    } else body = formData;
    return lastValueFrom(
      this.http.post(
        `${this.environment.endpoints.base}/core/agent/chat/`,
        body
      )
    );
  }

  historyMessage(id: string) {
    return lastValueFrom(
      this.http.post(
        `${this.environment.endpoints.base}/core/agent/chat/history-messages/`,
        { session_id: id }
      )
    );
  }
  conversationList() {
    return lastValueFrom(
      this.http.post(
        `${this.environment.endpoints.base}/core/agent/chat/conversations-list/`,
        ''
      )
    );
  }

  downloadDocument(documentId: string) {
    return lastValueFrom(
      this.http.post(
        `${this.environment.baseUrl}/core/documents/${documentId}/download/`,
        {},
        {
          responseType: 'blob',
        }
      )
    );
  }
}
