import { inject, Injectable } from '@angular/core';
import { StatefulService } from '@src/app/shared/services/stateful-service';
import { AuthApiService } from '@src/app/auth/auth-api.service';
import {
  AuthState,
  LoginPayload,
  RegisterPayload,
  UserData,
} from '@src/app/auth/auth.model';
import { map, tap } from 'rxjs';
import { TokenService } from '@src/app/auth/token/token.service';
import { USER_DATA } from '@src/app/auth/auth.tokens';

@Injectable({ providedIn: 'root' })
export class AuthStatefulService extends StatefulService<AuthState> {
  public static useIsAuthorized$() {
    return inject(USER_DATA).pipe(map(userData => Boolean(userData)));
  }

  private authApiService = inject(AuthApiService);
  private tokenService = inject(TokenService);

  constructor() {
    super({
      userData: null,
    });
  }

  public getUserDataValue() {
    return this._state$$.value.userData;
  }

  public initializeAuth() {
    if (this.tokenService.isTokenValid()) {
      this.authApiService.getUserData().subscribe(user => {
        this.setUserData(user);
      });
    }
  }

  public login(loginPayload: LoginPayload) {
    return this.authApiService
      .login(loginPayload)
      .pipe(
        tap(({ tokens, user }) => this.setLoggedData(tokens.access_token, user))
      );
  }

  public register(registerPayload: RegisterPayload) {
    return this.authApiService
      .register(registerPayload)
      .pipe(
        tap(({ tokens, user }) => this.setLoggedData(tokens.access_token, user))
      );
  }

  public logout() {
    return this.authApiService.logout().pipe(
      tap(() => {
        this.setUserData(null);
        this.tokenService.removeToken();
      })
    );
  }

  private setUserData(userData: UserData | null) {
    this.patchState({ userData });
  }

  private setLoggedData(token: string, userData: UserData) {
    this.tokenService.saveToken(token);
    this.setUserData(userData);
  }
}
