import { APP_INITIALIZER, inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '@app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { API_URL } from '@app/env.token';
import { environment } from '@src/environments/environment';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthStatefulService } from './auth/auth-stateful.service';
import { USER_DATA, USER_DATA_VALUE } from './auth/auth.tokens';
import { TokenInterceptor } from './auth/token/token.interceptor';
import { GlobalLoaderInterceptor } from '@app/core/global-loader/global-loader.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./core/shell/shell.routing.module'),
  },
];

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    RouterModule.forRoot(routes),
    TranslateModule.forRoot({
      extend: true,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
    }),
  ],
  providers: [
    {
      provide: API_URL,
      useValue: environment.API_URL,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        inject(AuthStatefulService).initializeAuth();
      },
    },
    {
      provide: USER_DATA,
      useFactory: () => {
        return inject(AuthStatefulService).getStateSlice$('userData');
      },
    },
    {
      provide: USER_DATA_VALUE,
      useFactory: () => {
        return inject(AuthStatefulService).getUserDataValue();
      },
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalLoaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
