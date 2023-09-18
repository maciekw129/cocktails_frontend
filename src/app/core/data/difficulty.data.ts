import { Difficulty } from '@app/core/model/cocktails.model';
import { SelectOptions } from '@app/shared/forms/controls/select/select';

export const difficultyLabels: Record<Difficulty, string> = {
  [Difficulty.easy]: 'Easy',
  [Difficulty.medium]: 'Medium',
  [Difficulty.hard]: 'Hard',
};

export const difficultyOptions: SelectOptions<Difficulty> = [
  { value: Difficulty.easy, label: difficultyLabels[Difficulty.easy] },
  { value: Difficulty.medium, label: difficultyLabels[Difficulty.medium] },
  { value: Difficulty.hard, label: difficultyLabels[Difficulty.hard] },
];
