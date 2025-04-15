import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterModule, RouterOutlet],
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  title = 'doctor-ai-chat-workspace';
}
