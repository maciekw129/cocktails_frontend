import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { GlobalLoaderService } from './global-loader.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class GlobalLoaderInterceptor implements HttpInterceptor {
  private globalLoaderService = inject(GlobalLoaderService);
  private snackBar = inject(MatSnackBar);

  private readonly ERROR_MESSAGE_DURATION = 3000;

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.globalLoaderService.setIsLoading(true);

    return next.handle(request).pipe(
      tap({
        next: () => this.globalLoaderService.setIsLoading(false),
        error: error => {
          this.globalLoaderService.setIsLoading(false);
          this.snackBar.open(`Error: ${error.error.message}`, 'X', {
            verticalPosition: 'top',
            duration: this.ERROR_MESSAGE_DURATION,
            panelClass: ['error'],
          });
        },
      })
    );
  }
}
