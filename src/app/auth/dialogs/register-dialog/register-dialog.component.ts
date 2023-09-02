import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { RegisterFormComponent } from '@app/auth/forms/register-form/register-form.component';
import { AuthService } from '@app/auth/auth.service';
import { RegisterPayload } from '@app/auth/auth.model';
import { LoginDialogComponent } from '@app/auth/dialogs/login-dialog/login-dialog.component';
import { LinkComponent } from '@app/shared/components/link/link.component';
import { BehaviorSubject, finalize, tap } from 'rxjs';

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
  private authService = inject(AuthService);
  private registerDialogRef = inject(MatDialogRef<LoginDialogComponent>);
  private dialogRef = inject(MatDialog);

  private readonly _isRegisterPending$ = new BehaviorSubject<boolean>(false);

  get isRegisterPending$() {
    return this._isRegisterPending$.asObservable();
  }

  public register(registerPayload: RegisterPayload) {
    this._isRegisterPending$.next(true);
    this.authService
      .register(registerPayload)
      .pipe(
        tap(() => {
          this.registerDialogRef.close();
        }),
        finalize(() => this._isRegisterPending$.next(false))
      )
      .subscribe();
  }

  public openLogin() {
    this.registerDialogRef.close();
    this.dialogRef.open(LoginDialogComponent);
  }
}
