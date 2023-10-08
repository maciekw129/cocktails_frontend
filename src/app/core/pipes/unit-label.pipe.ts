import { Pipe, PipeTransform } from '@angular/core';
import { Unit } from '@src/app/core/model/cocktails.model';
import { unitLabels } from '@src/app/core/data/unit.data';

@Pipe({
  name: 'unitLabel',
  standalone: true,
})
export class UnitLabelPipe implements PipeTransform {
  transform(value: Unit): string {
    return unitLabels[value];
  }
}
