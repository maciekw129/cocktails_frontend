import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@app/auth/auth.service';
import { tap } from 'rxjs';
import { inject } from '@angular/core';

export class AuthGuards {
  public static authentication(): CanActivateFn {
    return () => {
      const router = inject(Router);

      return AuthService.useIsAuthorized$().pipe(
        tap(isAuthorized => (isAuthorized ? true : router.navigateByUrl('/')))
      );
    };
  }
}
