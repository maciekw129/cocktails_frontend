import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ingredient } from '@app/modules/create-cocktail/create-cocktail.model';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UnitPipe } from '@app/modules/create-cocktail/components/ingredients-table/unit.pipe';

@Component({
  selector: 'c-ingredients-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    UnitPipe,
  ],
  templateUrl: './ingredients-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientsTableComponent {
  @Output() removeIngredient = new EventEmitter<Ingredient>();
  @Input() dataSource: Ingredient[];

  displayedColumns: string[] = [
    'name',
    'quantity',
    'unit',
    'isAlcoholic',
    'remove',
  ];

  handleRemove(ingredient: Ingredient) {
    this.removeIngredient.emit(ingredient);
  }
}
