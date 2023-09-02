import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkComponent } from '@app/shared/components/link/link.component';
import { LoginFormComponent } from '@app/auth/forms/login-form/login-form.component';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'c-add-ingredient-dialog',
  standalone: true,
  imports: [CommonModule, LinkComponent, LoginFormComponent, MatDialogModule],
  templateUrl: './add-ingredient-dialog.component.html',
  styleUrls: ['./add-ingredient-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddIngredientDialogComponent {}
