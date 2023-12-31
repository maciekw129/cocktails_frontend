import { InjectionToken } from '@angular/core';
import { UserData } from '@src/app/auth/auth.model';
import { Observable } from 'rxjs';

export const USER_DATA = new InjectionToken<Observable<UserData>>('USER_DATA');
export const USER_DATA_VALUE = new InjectionToken<UserData>('USER_DATA_VALUE');
