import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { LoginFormComponent } from '@app/auth/forms/login-form/login-form.component';
import { LoginPayload } from '@app/auth/auth.model';
import { AuthStatefulService } from '@app/auth/auth-stateful.service';
import { LinkComponent } from '@app/shared/components/link/link.component';
import { RegisterDialogComponent } from '@app/auth/dialogs/register-dialog/register-dialog.component';
import { tap } from 'rxjs';

@Component({
  selector: 'c-login-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, LoginFormComponent, LinkComponent],
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
