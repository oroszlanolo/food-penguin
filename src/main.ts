import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
        provideToastr({
            timeOut: 5000,
            positionClass: 'toast-bottom-right',
            closeButton: true,
            newestOnTop: false,
          }),
    ]
})
  .catch(err => console.error(err));
