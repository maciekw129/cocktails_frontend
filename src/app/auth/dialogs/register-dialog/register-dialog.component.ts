import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { RegisterFormComponent } from '../../forms/register-form/register-form.component';
import { AuthService } from '../../auth.service';
import { RegisterPayload } from '../../auth.model';

@Component({
  selector: 'c-register-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, RegisterFormComponent],
  templateUrl: './register-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterDialogComponent {
  private authService = inject(AuthService);

  public register(registerPayload: RegisterPayload) {
    this.authService.register(registerPayload).subscribe()
  }
}
