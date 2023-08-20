import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { LinkComponent } from '../../shared/components/link/link.component';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginDialogComponent } from '../../auth/dialogs/login-dialog/login-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { RegisterDialogComponent } from '../../auth/dialogs/register-dialog/register-dialog.component';
import { USER_DATA } from '../../auth/auth.tokens';
import { AsyncPipe, NgIf } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'c-navbar',
  standalone: true,
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss'],
  imports: [
    MatButtonModule,
    LinkComponent,
    RouterLink,
    ButtonComponent,
    MatDialogModule,
    MatIconModule,
    NgIf,
    AsyncPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  private dialogRef = inject(MatDialog);
  private authService = inject(AuthService);
  public userData$ = inject(USER_DATA);

  public openLoginDialog() {
    this.dialogRef.open(LoginDialogComponent);
  }

  public openRegisterDialog() {
    this.dialogRef.open(RegisterDialogComponent);
  }

  public logout() {
    this.authService.logout().subscribe();
  }
}
