import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthInterceptor } from './interceptors/auth-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    importProvidersFrom(HttpClientModule), 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    importProvidersFrom(ReactiveFormsModule), 
    importProvidersFrom(CommonModule)]
};
