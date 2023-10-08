import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '@src/app/auth/token/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private tokenService = inject(TokenService);

  private readonly PUBLIC_ENDPOINTS = ['auth/login', 'auth/register'];

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.token;

    if (
      this.PUBLIC_ENDPOINTS.some(endpoint => request.url.includes(endpoint)) ||
      !token
    ) {
      return next.handle(request);
    }

    const requestWithToken = request.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });

    return next.handle(requestWithToken);
  }
}
