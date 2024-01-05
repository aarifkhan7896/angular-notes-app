// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { AppModule } from './app/app.module';

import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
    providers: [importProvidersFrom(BrowserAnimationsModule)]
});

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));
