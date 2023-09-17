import { Pipe, PipeTransform } from '@angular/core';
import { actionLabels } from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step3-form/create-cocktail-step3-form.data';
import { Action } from '@app/core/model/cocktails.model';

@Pipe({
  name: 'actionLabel',
  standalone: true,
})
export class ActionLabelPipe implements PipeTransform {
  transform(value: Action): string {
    return actionLabels[value];
  }
}
