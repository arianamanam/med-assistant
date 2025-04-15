// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { AXButtonModule } from '@acorex/components/button';
// import {
//   AXFormMessageStyle,
//   AXFormModule,
//   AXFormUpdateOn,
// } from '@acorex/components/form';
// import { AXLabelModule } from '@acorex/components/label';
// import { AXTextBoxModule } from '@acorex/components/text-box';
// import { AXPasswordBoxModule } from '@acorex/components/password-box';

// @Component({
//   templateUrl: 'signup.component.html',
//   imports: [
//     AXFormModule,
//     CommonModule,
//     AXTextBoxModule,
//     AXLabelModule,
//     AXButtonModule,
//     AXPasswordBoxModule,
//   ],
// })
// export class SignupComponent {
//   options = {
//     validateOn: 'change' as AXFormUpdateOn,
//     messageStyle: 'float' as AXFormMessageStyle,
//   };
// }

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
  templateUrl: 'signup.component.html',
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
export class SignupComponent {
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
        .signup({ username, password })
        .then((response) => {
          if (response) {
            this.router.navigate(['/dashboard']);
          } else {
            alert('Signup failed. Please try again.');
          }
        })
        .catch(() => {
          alert('An error occurred. Please try again.');
        });
    } else {
      alert('Please enter both username and password.');
    }
  }
}
