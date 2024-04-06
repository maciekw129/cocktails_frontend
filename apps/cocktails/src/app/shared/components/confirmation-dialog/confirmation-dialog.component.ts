import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '@cocktails-ui';

@Component({
  selector: 'c-confirmation-dialog',
  standalone: true,
  imports: [MatDialogModule, ButtonComponent],
  template: `
    <h1 mat-dialog-title>{{ title }}</h1>
    <div mat-dialog-content>
      <p>{{ content }}</p>
    </div>
    <div mat-dialog-actions class="gap-3" align="center">
      <c-button translation="no" (buttonClick)="close(false)"></c-button>
      <c-button translation="yes" (buttonClick)="close(true)"></c-button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {
  @Input() title = 'Confirmation';
  @Input() content = 'Are you sure you want to continue?';

  private dialogRef = inject(MatDialogRef<ConfirmationDialogComponent>);

  close(value: boolean) {
    this.dialogRef.close(value);
  }
}
