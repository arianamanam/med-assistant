import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';

export const AuthInterceptorFn: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  let modifiedReq = req.clone();
  if (!(req.body instanceof FormData) && !req.headers.has('Content-Type')) {
    modifiedReq = modifiedReq.clone({
      setHeaders: { 'Content-Type': 'application/json' },
    });
  }

  const token = authService.getToken();

  if (token) {
    modifiedReq = modifiedReq.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) router.navigate(['/']);
      return throwError(() => error);
    })
  );
};
