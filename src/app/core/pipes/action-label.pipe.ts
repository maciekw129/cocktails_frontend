import { Pipe, PipeTransform } from '@angular/core';
import { Action } from '@src/app/core/model/cocktails.model';
import { actionLabels } from '@src/app/core/data/action.data';

@Pipe({
  name: 'actionLabel',
  standalone: true,
})
export class ActionLabelPipe implements PipeTransform {
  transform(value: Action): string {
    return actionLabels[value];
  }
}
