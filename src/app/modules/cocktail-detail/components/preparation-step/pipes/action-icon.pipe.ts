import { Pipe, PipeTransform } from '@angular/core';
import { Action } from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step3-form/create-cocktail-step3-form.model';
import { actionIcons } from '@app/modules/cocktail-detail/components/preparation-step/preparation-step.data';

@Pipe({
  name: 'actionIcon',
  standalone: true,
})
export class ActionIconPipe implements PipeTransform {
  transform(value: Action): string {
    return actionIcons[value];
  }
}
