import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, EMPTY, finalize, Observable } from 'rxjs';
import { GlobalLoaderService } from '@src/app/core/shell/global-loader/global-loader.service';
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
      catchError(error => {
        const message = error.error.message;

        this.snackBar.open(Array.isArray(message) ? message.join(` `) : message, 'X', {
          verticalPosition: 'top',
          duration: this.ERROR_MESSAGE_DURATION,
          panelClass: ['error', 'snack-bar--error'],
        });
        return EMPTY;
      }),
      finalize(() => {
        this.globalLoaderService.setIsLoading(false);
      })
    );
  }
}
