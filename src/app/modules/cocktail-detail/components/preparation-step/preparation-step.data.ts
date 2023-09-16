import { Action } from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step3-form/create-cocktail-step3-form.model';

export const actionIcons: Record<Action, string> = {
  [Action.SQUEEZE]: 'assets/images/juicer.png',
  [Action.MIX]: '',
  [Action.ADD]: 'assets/images/put.png',
  [Action.WAIT]: '',
  [Action.SHAKE]: '',
  [Action.DECORATE]: 'assets/images/cocktail.png',
  [Action.POUR]: 'assets/images/water.png',
};
