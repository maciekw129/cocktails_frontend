import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '@app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { DialogData } from '@app/shared/components/confirmation-dialog/confirmation-dialog.model';
import { filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConfirmationDialogService {
  private dialog = inject(MatDialog);

  public openConfirmationDialog$(config?: MatDialogConfig, data?: DialogData) {
    return this.dialog
      .open(ConfirmationDialogComponent, {
        ...config,
        data,
      })
      .afterClosed()
      .pipe(filter(Boolean));
  }
}
