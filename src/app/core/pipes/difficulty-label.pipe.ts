import { Pipe, PipeTransform } from '@angular/core';
import { Difficulty } from '@app/core/model/cocktails.model';
import { difficultyLabels } from '@app/core/data/difficulty.data';

@Pipe({
  name: 'difficultyLabel',
  standalone: true,
})
export class DifficultyLabelPipe implements PipeTransform {
  transform(value: Difficulty): string {
    return difficultyLabels[value];
  }
}
