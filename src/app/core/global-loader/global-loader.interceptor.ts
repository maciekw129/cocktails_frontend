import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { GlobalLoaderService } from './global-loader.service';

@Injectable()
export class GlobalLoaderInterceptor implements HttpInterceptor {
  private globalLoaderService = inject(GlobalLoaderService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.globalLoaderService.setIsLoading(true);

    return next.handle(request).pipe(
      tap(() => this.globalLoaderService.setIsLoading(false))
    );
  }
}
