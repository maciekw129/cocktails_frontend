import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { API_URL } from './env.token';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./core/shell/shell.routing.module'),
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    {
      provide: API_URL,
      useValue: environment.API_URL,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
