import { Pipe, PipeTransform } from '@angular/core';
import { difficultyLabels } from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step1-form/create-cocktail-step1-form.data';
import { Difficulty } from '@app/core/model/cocktails.model';

@Pipe({
  name: 'difficultyLabel',
  standalone: true,
})
export class DifficultyLabelPipe implements PipeTransform {
  transform(value: Difficulty): string {
    return difficultyLabels[value];
  }
}
