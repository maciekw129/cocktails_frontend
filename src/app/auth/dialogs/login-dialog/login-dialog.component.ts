import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { LoginFormComponent } from '../../forms/login-form/login-form.component';
import { LoginPayload } from '../../auth.model';
import { AuthService } from '../../auth.service';
import { LinkComponent } from '../../../shared/components/link/link.component';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';

@Component({
  selector: 'c-login-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, LoginFormComponent, LinkComponent],
  templateUrl: './login-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginDialogComponent {
  private authService = inject(AuthService);
  private loginDialogRef = inject(MatDialogRef<LoginDialogComponent>);
  private dialogRef = inject(MatDialog);

  public login(loginPayload: LoginPayload) {
    this.authService.login(loginPayload).subscribe(() => {
      this.loginDialogRef.close();
    });
  }

  public openRegister() {
    this.loginDialogRef.close();
    this.dialogRef.open(RegisterDialogComponent);
  }
}
