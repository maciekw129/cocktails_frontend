import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  AuthAPI,
  LoginPayload,
  RefreshPayload,
  RegisterPayload,
  UserData,
} from '@src/app/auth/auth.model';
import { API_URL } from '@src/app/env.token';
import { HttpWithMessage } from '@src/app/shared/services/http-with-message';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private http = inject(HttpClient);
  private httpWithMessage = inject(HttpWithMessage);
  private readonly API_URL = inject(API_URL);

  private readonly AUTH_URL = `${this.API_URL}/auth`;

  public login(loginPayload: LoginPayload) {
    return this.httpWithMessage.post<AuthAPI>(
      `${this.AUTH_URL}/login`,
      'You successfully logged in.',
      loginPayload
    );
  }

  public register(registerPayload: RegisterPayload) {
    return this.httpWithMessage.post<AuthAPI>(
      `${this.AUTH_URL}/register`,
      'You successfully registered.',
      registerPayload
    );
  }

  public logout() {
    return this.httpWithMessage.post<AuthAPI>(
      `${this.AUTH_URL}/logout`,
      'You successfully logged out.',
      null
    );
  }

  public refreshTokens(refreshPayload: RefreshPayload) {
    return this.http.post<AuthAPI>(`${this.AUTH_URL}/refresh`, refreshPayload);
  }

  public getUserData() {
    return this.http.get<UserData>(`${this.API_URL}/users`);
  }
}
