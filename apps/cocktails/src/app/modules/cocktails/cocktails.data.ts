import { SelectOptions } from '@app/shared/forms/controls/select/select';
import { Action, Category, Difficulty, Unit } from './cocktails.model';

export const actionLabels: Record<Action, string> = {
  [Action.ADD]: 'Add',
  [Action.POUR]: 'Pour',
  [Action.MIX]: 'Mix',
  [Action.DECORATE]: 'Decorate',
  [Action.WAIT]: 'Wait',
  [Action.SQUEEZE]: 'Squeeze',
  [Action.SHAKE]: 'Shake',
};

export const actionSelectOptions: SelectOptions<Action> = [
  { value: Action.ADD, label: actionLabels[Action.ADD] },
  { value: Action.POUR, label: actionLabels[Action.POUR] },
  { value: Action.MIX, label: actionLabels[Action.MIX] },
  { value: Action.DECORATE, label: actionLabels[Action.DECORATE] },
  { value: Action.WAIT, label: actionLabels[Action.WAIT] },
  { value: Action.SQUEEZE, label: actionLabels[Action.SQUEEZE] },
  { value: Action.SHAKE, label: actionLabels[Action.SHAKE] },
];

export const categoryLables: Record<Category, string> = {
  [Category.shot]: 'Shot',
  [Category.short]: 'Short cocktail',
  [Category.long]: 'Long cocktail',
  [Category.other]: 'Other',
};

export const categoryOptions: SelectOptions<Category> = [
  { value: Category.shot, label: categoryLables[Category.shot] },
  { value: Category.short, label: categoryLables[Category.short] },
  { value: Category.long, label: categoryLables[Category.long] },
  { value: Category.other, label: categoryLables[Category.other] },
];

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

export const unitLabels: Record<Unit, string> = {
  [Unit.pcs]: 'pcs',
  [Unit.g]: 'g',
  [Unit.l]: 'l',
  [Unit.ml]: 'ml',
  [Unit.cup]: 'cup',
  [Unit.tsp]: 'tsp',
  [Unit.tbsp]: 'tbsp',
  [Unit.pinch]: 'pinch',
};

export const unitOptions: SelectOptions<Unit> = [
  { value: Unit.g, label: unitLabels[Unit.g] },
  { value: Unit.l, label: unitLabels[Unit.l] },
  { value: Unit.ml, label: unitLabels[Unit.ml] },
  { value: Unit.pcs, label: unitLabels[Unit.pcs] },
  { value: Unit.cup, label: unitLabels[Unit.cup] },
  { value: Unit.tsp, label: unitLabels[Unit.tsp] },
  { value: Unit.tbsp, label: unitLabels[Unit.tbsp] },
  { value: Unit.pinch, label: unitLabels[Unit.pinch] },
];

export const actionIcons: Record<Action, string> = {
  [Action.SQUEEZE]: 'assets/images/juicer.png',
  [Action.MIX]: 'assets/images/mix.png',
  [Action.ADD]: 'assets/images/put.png',
  [Action.WAIT]: 'assets/images/hourglass.png',
  [Action.SHAKE]: 'assets/images/shaker.png',
  [Action.DECORATE]: 'assets/images/cocktail.png',
  [Action.POUR]: 'assets/images/water.png',
};
