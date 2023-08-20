import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private tokenService = inject(TokenService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.token;

    if(request.url.includes('auth') || token) {
      return next.handle(request);
    }

    request.headers.set('Authorization', `Bearer ${token}`);

    return next.handle(request);
  }
}
