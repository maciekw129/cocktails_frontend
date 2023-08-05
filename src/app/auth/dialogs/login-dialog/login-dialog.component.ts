import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from "@angular/material/dialog";
import {LoginFormComponent} from "../../forms/login-form/login-form.component";

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, LoginFormComponent],
  templateUrl: './login-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginDialogComponent {

}
