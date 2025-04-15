import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';

import {
  Observable,
  tap,
  map,
  catchError,
  of,
  delay,
  lastValueFrom,
} from 'rxjs';
import { User, UserSession } from '../app/login/login.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private sessionKey = 'SESSION';
  private currentUser = signal<UserSession | null>(null);
  private router = Inject(Router);
  constructor(
    private http: HttpClient,
    @Inject('env') private environment: any
  ) {
    this.initializeSession();
  }

  private initializeSession(): void {
    const session = localStorage.getItem(this.sessionKey);
    if (session) {
      try {
        const parsedSession = JSON.parse(session);
        this.currentUser.set(parsedSession);
      } catch (error) {
        this.clearSession();
      }
    }
  }

  logout(): void {
    this.clearSession();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }

  getAuthStatus(): Signal<UserSession | null> {
    return this.currentUser.asReadonly();
  }

  getToken(): string | null {
    return this.currentUser()?.access || null;
  }

  getUserInfo(): User | null {
    return this.currentUser()?.user || null;
  }

  private clearSession(): void {
    localStorage.removeItem(this.sessionKey);
    this.currentUser.set(null);
  }
  /*login(body: any) {
    return this.http.post(
      `${this.environment.endpoints.base}/auth/login/`,
      body
    );
  }*/

  login(credentials: {
    username: string;
    password: string;
  }): Observable<boolean> {
    return this.http
      .post(`${this.environment.endpoints.base}/auth/login/`, credentials)
      .pipe(
        tap((response: any) => {
          const session: UserSession = {
            access: response.access,
            user: response.user,
          };
          localStorage.setItem(this.sessionKey, JSON.stringify(session));
          this.currentUser.set(session);
        }),
        // map(() => true),
        catchError((error) => {
          this.clearSession();
          return of(false);
        })
      );
  }

  signup(body: any) {
    return lastValueFrom(
      this.http.post(`${this.environment.endpoints.base}/auth/register/`, body)
    );
  }
}
