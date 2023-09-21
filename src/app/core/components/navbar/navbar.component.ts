import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { LinkComponent } from '@app/shared/components/link/link.component';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginDialogComponent } from '@app/auth/dialogs/login-dialog/login-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { RegisterDialogComponent } from '@app/auth/dialogs/register-dialog/register-dialog.component';
import { USER_DATA } from '@app/auth/auth.tokens';
import { CommonModule } from '@angular/common';
import { AuthStatefulService } from '@app/auth/auth-stateful.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'c-navbar',
  standalone: true,
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss'],
  imports: [
    CommonModule,
    MatButtonModule,
    LinkComponent,
    RouterLink,
    ButtonComponent,
    MatDialogModule,
    MatIconModule,
    TranslateModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  private dialogRef = inject(MatDialog);
  private authService = inject(AuthStatefulService);
  public isAuthorized$ = AuthStatefulService.useIsAuthorized$();

  public hasBackground = false;

  @HostListener('window:scroll')
  manageNavbarColor() {
    this.hasBackground = Boolean(window.scrollY);
  }

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
