import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import {
  AX_TRANSLATION_CONFIG,
  translationConfig,
} from '@acorex/core/translation';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { AXValidationModule } from '@acorex/core/validation';
import { environment } from '../environments/environment';
import { AuthInterceptorFn } from './basic-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideHttpClient(withInterceptors([AuthInterceptorFn])),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    importProvidersFrom(AXValidationModule.forRoot()),

    {
      provide: AX_TRANSLATION_CONFIG,
      useValue: translationConfig({
        preloadLangs: ['en'],
        defaultLang: 'en',
      }),
    },
    { provide: 'env', useValue: environment },
  ],
};
