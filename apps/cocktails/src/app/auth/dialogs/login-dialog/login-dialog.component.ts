import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LoginFormComponent } from '@src/app/auth/forms/login-form/login-form.component';
import { LoginPayload } from '@src/app/auth/auth.model';
import { AuthStatefulService } from '@src/app/auth/auth-stateful.service';
import { LinkComponent } from '@cocktails-ui';
import { RegisterDialogComponent } from '@src/app/auth/dialogs/register-dialog/register-dialog.component';
import { tap } from 'rxjs';

@Component({
  selector: 'c-login-dialog',
  standalone: true,
  imports: [MatDialogModule, LoginFormComponent, LinkComponent],
  templateUrl: './login-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginDialogComponent {
  private authService = inject(AuthStatefulService);
  private loginDialogRef = inject(MatDialogRef<LoginDialogComponent>);
  private dialogRef = inject(MatDialog);

  public login(loginPayload: LoginPayload) {
    this.authService
      .login(loginPayload)
      .pipe(
        tap(() => {
          this.loginDialogRef.close();
        })
      )
      .subscribe();
  }

  public openRegister() {
    this.loginDialogRef.close();
    this.dialogRef.open(RegisterDialogComponent);
  }
}
