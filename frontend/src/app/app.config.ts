import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { routes } from './app.routes';

export function tokenGetter() {
  return sessionStorage.getItem('token');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ['grupo-2arqui-production-backend.up.railway.app'],
          disallowedRoutes: [
            'https://grupo-2arqui-production-backend.up.railway.app/login/forget',
          ],
          // allowedDomains: ['localhost:8080'],
          // disallowedRoutes: [
          //   'http://localhost:8080/login/forget',
          // ],
        },
      })
    ),

    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
  ],
};
