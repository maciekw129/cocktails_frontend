import { inject, Injectable } from '@angular/core';
import { HttpWithMessage } from '@src/app/shared/services/http-with-message';
import { API_URL } from '@src/app/env.token';
import { PatchUserDto } from '@src/app/modules/user-profile/user-profile.model';
import { Observable } from 'rxjs';
import { UserData } from '@src/app/auth/auth.model';

@Injectable({ providedIn: 'root' })
export class UserProfileApiService {
  private httpWithMessage = inject(HttpWithMessage);
  private readonly API_URL = inject(API_URL);

  private readonly USERS_URL = `${this.API_URL}/users`;

  public patchUserData(patchUserDto: PatchUserDto): Observable<UserData> {
    return this.httpWithMessage.patch<UserData>(
      this.USERS_URL,
      'You successfully updated your profile data.',
      patchUserDto
    );
  }
}
