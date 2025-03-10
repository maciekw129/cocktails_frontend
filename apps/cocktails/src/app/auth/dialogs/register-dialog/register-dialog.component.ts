import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RegisterFormComponent } from '@src/app/auth/forms/register-form/register-form.component';
import { AuthStatefulService } from '@src/app/auth/auth-stateful.service';
import { RegisterPayload } from '@src/app/auth/auth.model';
import { LoginDialogComponent } from '@src/app/auth/dialogs/login-dialog/login-dialog.component';
import { LinkComponent } from '@cocktails-ui';
import { tap } from 'rxjs';

@Component({
  selector: 'c-register-dialog',
  standalone: true,
  imports: [MatDialogModule, RegisterFormComponent, LinkComponent],
  templateUrl: './register-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterDialogComponent {
  private authService = inject(AuthStatefulService);
  private registerDialogRef = inject(MatDialogRef<LoginDialogComponent>);
  private dialogRef = inject(MatDialog);

  public register(registerPayload: RegisterPayload) {
    this.authService
      .register(registerPayload)
      .pipe(
        tap(() => {
          this.registerDialogRef.close();
        })
      )
      .subscribe();
  }

  public openLogin() {
    this.registerDialogRef.close();
    this.dialogRef.open(LoginDialogComponent);
  }
}
