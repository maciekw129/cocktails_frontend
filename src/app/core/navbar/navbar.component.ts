import {ChangeDetectionStrategy, Component, inject} from "@angular/core";
import {MatButtonModule} from "@angular/material/button";
import {LinkComponent} from "../../shared/components/link/link.component";
import {RouterLink} from "@angular/router";
import {ButtonComponent} from "../../shared/components/button/button.component";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {LoginDialogComponent} from "../../auth/dialogs/login-dialog/login-dialog.component";
import {MatIconModule} from "@angular/material/icon";

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
    MatIconModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  public dialogRef = inject(MatDialog);

  public openLoginDialog() {
    this.dialogRef.open(LoginDialogComponent);
  }
}
