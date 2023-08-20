import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthAPI, LoginPayload, RefreshPayload, RegisterPayload, UserData } from './auth.model';
import { API_URL } from '../env.token';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private http = inject(HttpClient);
  private readonly API_URL = inject(API_URL);

  private readonly authUrl = `${this.API_URL}/auth`;

  public login(loginPayload: LoginPayload) {
    return this.http.post<AuthAPI>(`${this.authUrl}/login`, loginPayload);
  }

  public register(registerPayload: RegisterPayload) {
    return this.http.post<AuthAPI>(`${this.authUrl}/register`, registerPayload);
  }

  public logout() {
    return this.http.post(`${this.authUrl}/logout`, null);
  }

  public refreshTokens(refreshPayload: RefreshPayload) {
    return this.http.post<AuthAPI>(`${this.authUrl}/refresh`, refreshPayload);
  }

  public getUserData() {
    return this.http.get<UserData>(`${this.API_URL}/users`);
  }
}
