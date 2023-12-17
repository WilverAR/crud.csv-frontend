import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {HttpClientModule} from "@angular/common/http";
import {HttpBaseService} from "./shared/services/http-base.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), HttpBaseService, importProvidersFrom(HttpClientModule, BrowserModule, BrowserAnimationsModule)]
};
