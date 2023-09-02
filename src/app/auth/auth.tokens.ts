import { InjectionToken } from '@angular/core';
import { UserData } from '@app/auth/auth.model';
import { Observable } from 'rxjs';

export const USER_DATA = new InjectionToken<Observable<UserData>>('USER_DATA');
