import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AXButtonModule } from '@acorex/components/button';
import {
  AXFormMessageStyle,
  AXFormModule,
  AXFormUpdateOn,
} from '@acorex/components/form';
import { AXLabelModule } from '@acorex/components/label';
import { AXTextBoxModule } from '@acorex/components/text-box';
import { AXPasswordBoxModule } from '@acorex/components/password-box';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  templateUrl: 'login.component.html',
  imports: [
    AXFormModule,
    CommonModule,
    AXTextBoxModule,
    AXLabelModule,
    AXButtonModule,
    FormsModule,
    AXPasswordBoxModule,
  ],
})
export class LoginComponent {
  options = {
    validateOn: 'change' as AXFormUpdateOn,
    messageStyle: 'float' as AXFormMessageStyle,
  };
  credentials = {
    username: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  onClick(): void {
    const { username, password } = this.credentials;
    if (username && password) {
      this.authService
        .login({ username, password })
        .subscribe((success: boolean) => {
          if (success) {
            this.router.navigate(['/dashboard']);
          } else {
            alert('Login failed. Please check your credentials.');
          }
        });
    } else {
      alert('Please enter both username and password.');
    }
  }
}
