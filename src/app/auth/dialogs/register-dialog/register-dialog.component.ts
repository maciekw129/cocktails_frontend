import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { RegisterFormComponent } from '@app/auth/forms/register-form/register-form.component';
import { AuthStatefulService } from '@app/auth/auth-stateful.service';
import { RegisterPayload } from '@app/auth/auth.model';
import { LoginDialogComponent } from '@app/auth/dialogs/login-dialog/login-dialog.component';
import { LinkComponent } from '@app/shared/components/link/link.component';
import { tap } from 'rxjs';

@Component({
  selector: 'c-register-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    RegisterFormComponent,
    LinkComponent,
  ],
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
