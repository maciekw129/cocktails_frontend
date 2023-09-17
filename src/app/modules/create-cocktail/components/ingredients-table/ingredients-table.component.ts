import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UnitPipe } from '@app/modules/create-cocktail/components/ingredients-table/unit.pipe';
import { CdkColumnDef } from '@angular/cdk/table';
import { Ingredient } from '@app/core/model/cocktails.model';

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
  styleUrls: ['ingredients-table.component.scss'],
  providers: [CdkColumnDef],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientsTableComponent {
  @Output() removeIngredient = new EventEmitter<Ingredient>();
  @Input() dataSource: MatTableDataSource<Ingredient> =
    new MatTableDataSource<Ingredient>([]);
  @Input() isReadonly = true;

  public displayedColumns: string[] = [
    'position',
    'name',
    'quantity',
    'unit',
    'isAlcoholic',
    'remove',
  ];

  public displayedReadonlyColumns: string[] = [
    'position',
    'name',
    'quantity',
    'unit',
  ];

  public handleRemove(ingredient: Ingredient) {
    this.removeIngredient.emit(ingredient);
  }
}
