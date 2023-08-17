import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'c-register-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterDialogComponent {

}
