import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {dataInterceptorInterceptor} from "./interceptors/data-interceptor.interceptor";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(withInterceptors([dataInterceptorInterceptor])), provideRouter(routes), provideAnimationsAsync(), provideStore()]
};
