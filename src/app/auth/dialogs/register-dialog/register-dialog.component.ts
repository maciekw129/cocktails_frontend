import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { RegisterFormComponent } from '../../forms/register-form/register-form.component';
import { AuthService } from '../../auth.service';
import { RegisterPayload } from '../../auth.model';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { LinkComponent } from '../../../shared/components/link/link.component';

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

  public register(registerPayload: RegisterPayload) {
    this.authService.register(registerPayload).subscribe(() => {
      this.registerDialogRef.close();
    });
  }

  public openLogin() {
    this.registerDialogRef.close();
    this.dialogRef.open(LoginDialogComponent);
  }
}
