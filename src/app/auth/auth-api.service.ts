import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginAPI, LoginPayload, UserData } from './auth.model';
import { API_URL } from '../env.token';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private http = inject(HttpClient);
  private readonly API_URL = inject(API_URL);

  public login(loginPayload: LoginPayload) {
    return this.http.post<LoginAPI>(`${this.API_URL}/auth/login`, loginPayload);
  }

  public fetchUserData(userId: string) {
    return this.http.get<UserData>(`${this.API_URL}/user/${userId}`);
  }
}
