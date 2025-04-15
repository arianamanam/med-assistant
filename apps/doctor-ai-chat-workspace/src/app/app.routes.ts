import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NewPatientComponent } from './new-patient/new-patient.component';
import { ChatComponent } from './chat/chat.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Signup',
  },
  {
    path: 'dashboard',
    component: NewPatientComponent,
    title: 'dashboard',
  },
  {
    path: 'chat',
    component: ChatComponent,
  },
];
