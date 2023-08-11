import { inject, Injectable } from '@angular/core';
import { StatefulService } from '../shared/services/stateful-service';
import { AuthApiService } from './auth-api.service';
import { AuthState, LoginPayload } from './auth.model';
import { switchMap } from 'rxjs';
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
      switchMap(({ access_token }) => {
        this.tokenService.saveToken(access_token);
        const userId = this.tokenService.decodedToken!.sub!;
        return this.authApiService.fetchUserData(userId);
      })
    );
  }
}
