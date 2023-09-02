import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ingredient } from '@app/modules/create-cocktail/create-cocktail.model';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'c-ingredients-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './ingredients-table.component.html',
  styleUrls: ['./ingredients-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientsTableComponent {
  @Input() dataSource: Ingredient[];

  displayedColumns: string[] = ['name', 'quantity', 'unit', 'remove'];

  handleRemove(e) {
    return;
  }
}
