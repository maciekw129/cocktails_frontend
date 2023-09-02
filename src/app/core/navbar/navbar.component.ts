import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { LinkComponent } from '@app/shared/components/link/link.component';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginDialogComponent } from '@app/auth/dialogs/login-dialog/login-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { RegisterDialogComponent } from '@app/auth/dialogs/register-dialog/register-dialog.component';
import { USER_DATA } from '@app/auth/auth.tokens';
import { AsyncPipe, NgIf } from '@angular/common';
import { AuthService } from '@app/auth/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject, finalize } from 'rxjs';

@Component({
  selector: 'c-navbar',
  standalone: true,
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss'],
  imports: [
    MatButtonModule,
    LinkComponent,
    RouterLink,
    ButtonComponent,
    MatDialogModule,
    MatIconModule,
    NgIf,
    AsyncPipe,
    TranslateModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  private dialogRef = inject(MatDialog);
  private authService = inject(AuthService);
  public userData$ = inject(USER_DATA);

  private readonly _isLogoutPending$ = new BehaviorSubject<boolean>(false);

  get isLogoutPending$() {
    return this._isLogoutPending$.asObservable();
  }

  public openLoginDialog() {
    this.dialogRef.open(LoginDialogComponent);
  }

  public openRegisterDialog() {
    this.dialogRef.open(RegisterDialogComponent);
  }

  public logout() {
    this._isLogoutPending$.next(true);
    this.authService
      .logout()
      .pipe(
        finalize(() => {
          this._isLogoutPending$.next(false);
        })
      )
      .subscribe();
  }
}
