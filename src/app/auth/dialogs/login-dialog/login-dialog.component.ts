import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginFormComponent } from '../../forms/login-form/login-form.component';
import { LoginPayload } from '../../auth.model';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, LoginFormComponent],
  templateUrl: './login-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginDialogComponent {
  private authService = inject(AuthService);

  public login(loginPayload: LoginPayload) {
    this.authService.login(loginPayload).subscribe();
  }
}
