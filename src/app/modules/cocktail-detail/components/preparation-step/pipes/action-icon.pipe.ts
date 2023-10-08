import { Pipe, PipeTransform } from '@angular/core';
import { actionIcons } from '@src/app/modules/cocktail-detail/components/preparation-step/preparation-step.data';
import { Action } from '@src/app/core/model/cocktails.model';

@Pipe({
  name: 'actionIcon',
  standalone: true,
})
export class ActionIconPipe implements PipeTransform {
  transform(value: Action): string {
    return actionIcons[value];
  }
}
