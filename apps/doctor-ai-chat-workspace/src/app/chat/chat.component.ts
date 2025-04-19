import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AXPopupService } from '@acorex/components/popup';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AIService } from '../../service/ai.service';
import { FileDownloadComponent } from '../file-download/file-download.component';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports: [FormsModule, CommonModule, FileDownloadComponent, MarkdownModule],
  providers: [AIService, MarkdownService],
})
export class ChatComponent implements OnInit {
  document = {
    id: 'f5df5805-58be-40f1-9746-1ffaeecac9d1',
    title: '3.txt',
    type: 'txt',
    download_url:
      '/core/documents/f5df5805-58be-40f1-9746-1ffaeecac9d1/download/',
  };
  session_id: any;
  userInput: any;
  response: any;
  chatMessages: any[] = [];

  aIService = inject(AIService);
  chats: any[] = [];
  chatHistory: any;
  historyItems: any;
  chatData: any;
  baseContext: any;
  fileMessages: any[] = [];
  selectedCategory: 'voices' | 'documents' = 'documents';

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.chatData = nav?.extras.state?.['chatData'];
    console.log(this.chatData);
    if (!this.chatData) {
      this.chatData = {
        message: 'محتوایی دریافت نشد ',
      };
    }
  }

  ngOnInit() {
    console.log();
    // if (this.chatData && typeof this.chatData === 'string') {
    //
    // }
    if (this.chatData.response) {
      const thinkingMessage = {
        user_message: this.chatData,
        agent_message: 'is thinking ...',
        showActions: false,
      };

      this.chatMessages.push(thinkingMessage);
      this.sendMessage(this.chatData, thinkingMessage);
    } else {
      this.loadChatHistory(this.chatData.session_id);
    }
  }

  onSendMessage() {
    const thinkingMessage = {
      user_message: this.userInput,
      agent_message: 'is thinking ...',
      showActions: false,
    };
    this.chatMessages.push(thinkingMessage);
    this.sendMessage(this.userInput, thinkingMessage);
  }

  sendMessage(user_message: string, thinkingMessage: any, agent_id?: string) {
    const question: any = {
      user_message: user_message,
      model_id: '05f2b789-be71-4cc2-b8f6-0a7b62a312e8',
    };

    if (this.session_id) question.session_id = this.session_id;
    this.userInput = '';
    if (agent_id) question.agent_id = agent_id;

    this.aIService.chat(question).then((response: any) => {
      console.log(response);
      if (response) {
        this.session_id = response.session_id;
        const index = this.chatMessages.indexOf(thinkingMessage);
        if (index !== -1) {
          this.chatMessages[index].agent_message = response.response
            ? response.response
            : response.error;

          this.chatMessages[index].showActions = true;
        }
        this.scrollToBottom();
      }
    });

    this.scrollToBottom();
  }

  loadChatHistory(id: string) {
    this.aIService.historyMessage(id).then((response: any) => {
      this.chatMessages = [];
      this.fileMessages = [];

      for (const message of response.messages) {
        if (message.document) {
          this.fileMessages.push(message);
        } else {
          this.chatMessages.push(message);
        }
      }
    });
  }

  scrollToBottom() {
    setTimeout(() => {
      const chatContainer = document.getElementById('chatContainer');
      if (chatContainer) {
        chatContainer.scrollTo({
          top: chatContainer.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 0);
  }

  requestMedicine() {
    // this.userInput = 'می‌خواهم دارو درخواست کنم.';
    // this.onSendMessage();
  }

  suggestPrescription() {
    const msg = 'برای شرایط بیمار چه نسخه‌ای پیشنهاد می‌کنی؟';
    const thinkingMessage = {
      user_message: msg,
      agent_message: 'is thinking ...',
      showActions: false,
    };
    this.chatMessages.push(thinkingMessage);

    this.sendMessage(
      this.chatData.response,
      thinkingMessage,
      '5dc24072-2f05-41cb-bdfe-20d5a08fa63c'
    );
    this.response();
  }

  showSummary() {
    this.userInput = this.chatData.response;
    const msg = ' شرایط بیمار را خلاصه کن  ';
    const thinkingMessage = {
      user_message: msg,
      agent_message: 'is thinking ...',
      showActions: false,
    };
    this.chatMessages.push(thinkingMessage);
    this.sendMessage(
      this.chatData.response,
      thinkingMessage,
      'd26bfe27-099f-4858-b3e7-178fe9227616'
    );
  }
  groupedFiles = {
    documents: [] as any[],
    audios: [] as any[],
  };

  categorizeFile(message: any) {
    const fileName = message.document.name.toLowerCase();

    if (
      fileName.match(/\.(jpg|jpeg|png|gif|bmp|svg)$/) ||
      fileName.endsWith('.pdf')
    ) {
      this.groupedFiles.documents.push(message);
    } else if (fileName.match(/\.(mp3|wav|ogg|m4a)$/)) {
      this.groupedFiles.audios.push(message);
    }
  }
}
