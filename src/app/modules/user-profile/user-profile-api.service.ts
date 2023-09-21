import { inject, Injectable } from '@angular/core';
import { HttpWithMessage } from '@app/shared/services/http-with-message';
import { API_URL } from '@app/env.token';
import { PatchUserDto } from '@app/modules/user-profile/user-profile.model';
import { Observable } from 'rxjs';
import { UserData } from '@app/auth/auth.model';

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
