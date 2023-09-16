import { Pipe, PipeTransform } from '@angular/core';
import { Action } from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step3-form/create-cocktail-step3-form.model';
import { actionLabels } from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step3-form/create-cocktail-step3-form.data';

@Pipe({
  name: 'actionLabel',
  standalone: true,
})
export class ActionLabelPipe implements PipeTransform {
  transform(value: Action): string {
    return actionLabels[value];
  }
}
