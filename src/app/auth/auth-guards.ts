import { CanActivateFn, Router } from '@angular/router';
import { AuthStatefulService } from '@src/app/auth/auth-stateful.service';
import { tap } from 'rxjs';
import { inject } from '@angular/core';

export class AuthGuards {
  public static authentication(): CanActivateFn {
    return () => {
      const router = inject(Router);

      return AuthStatefulService.useIsAuthorized$().pipe(
        tap(isAuthorized => (isAuthorized ? true : router.navigateByUrl('/')))
      );
    };
  }
}
