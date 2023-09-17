import { Pipe, PipeTransform } from '@angular/core';
import { unitLabels } from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step2-form/add-ingredient-form/add-ingredient-form.data';
import { Unit } from '@app/core/model/cocktails.model';

@Pipe({
  name: 'unit',
  standalone: true,
})
export class UnitPipe implements PipeTransform {
  transform(value: Unit): string {
    return unitLabels[value];
  }
}
