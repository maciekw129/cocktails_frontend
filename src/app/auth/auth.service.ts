import { inject, Injectable } from '@angular/core';
import { StatefulService } from '../shared/services/stateful-service';
import { AuthApiService } from './auth-api.service';
import { AuthState, LoginPayload, RegisterPayload, UserData } from './auth.model';
import { tap } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class AuthService extends StatefulService<AuthState> {
  private authApiService = inject(AuthApiService);
  private tokenService = inject(TokenService);

  constructor() {
    super({
      userData: null,
    });
  }

  public login(loginPayload: LoginPayload) {
    return this.authApiService.login(loginPayload).pipe(
      tap(({ tokens, user }) => this.setLoggedData(tokens.access_token, user))
    );
  }

  public register(registerPayload: RegisterPayload) {
    return this.authApiService.register(registerPayload).pipe(
      tap(({tokens, user}) => this.setLoggedData(tokens.access_token, user))
)
  }

  private setUserData(userData: UserData) {
    this.patchState({userData});
  }

  private setLoggedData(token: string, userData: UserData) {
    this.tokenService.saveToken(token);
    console.log(userData);
    this.setUserData(userData);
  }
}
