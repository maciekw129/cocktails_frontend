import { Pipe, PipeTransform } from '@angular/core';
import { unitLabels } from '@app/modules/create-cocktail/forms/add-ingredient-form/add-ingredient-form.data';
import { Unit } from '@app/modules/create-cocktail/create-cocktail.model';

@Pipe({
  name: 'unit',
  standalone: true,
})
export class UnitPipe implements PipeTransform {
  transform(value: Unit): string {
    return unitLabels[value];
  }
}
