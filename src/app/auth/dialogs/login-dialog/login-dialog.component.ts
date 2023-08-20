import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LoginFormComponent } from '../../forms/login-form/login-form.component';
import { LoginPayload } from '../../auth.model';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'c-login-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, LoginFormComponent],
  templateUrl: './login-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginDialogComponent {
  private authService = inject(AuthService);
  private dialogRef = inject(MatDialogRef<LoginDialogComponent>);

  public login(loginPayload: LoginPayload) {
    this.authService.login(loginPayload).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
