import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';

import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule),
        provideHttpClient(withInterceptorsFromDi()),
    ]
})
  .catch(err => console.error(err));
