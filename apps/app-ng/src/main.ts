import { HttpClientModule } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

import { registerEnvironment } from './app/environments/provider';

if (registerEnvironment.useValue.NODE_ENV === 'production') enableProdMode();

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(HttpClientModule), registerEnvironment],
}).catch((err) => console.error(err));
