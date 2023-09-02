import { Injectable } from '@angular/core';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { UnsubscribeOnDestroy } from '@app/shared/services/unsubscribe-on-destroy';

@Injectable({
  providedIn: 'root',
})
export class TokenService extends UnsubscribeOnDestroy {
  private _token = localStorage.getItem('token');
  private _decodedToken: JwtPayload | null = null;

  private readonly MILISECONDS_IN_SECONDS = 1000;

  get token() {
    return this._token;
  }

  get decodedToken() {
    return this._decodedToken;
  }

  constructor() {
    super();
    this.decodeToken();
  }

  private decodeToken() {
    if (this._token) this._decodedToken = jwtDecode<JwtPayload>(this._token);
  }

  private isTokenExpired(): boolean | void {
    const expTime = this._decodedToken?.exp;
    if (expTime) {
      const expDate = new Date(expTime * this.MILISECONDS_IN_SECONDS);
      return expDate.getTime() - Date.now() < 0;
    }
  }

  public isTokenValid(): boolean {
    if (this._token) {
      return !this.isTokenExpired();
    }
    return false;
  }

  public saveToken(token: string) {
    this._token = token;
    this.decodeToken();
    localStorage.setItem('token', token);
  }

  public removeToken() {
    localStorage.removeItem('token');
    this._token = null;
  }
}
