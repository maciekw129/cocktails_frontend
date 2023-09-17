import { Action } from '@app/core/model/cocktails.model';

export const actionIcons: Record<Action, string> = {
  [Action.SQUEEZE]: 'assets/images/juicer.png',
  [Action.MIX]: '',
  [Action.ADD]: 'assets/images/put.png',
  [Action.WAIT]: '',
  [Action.SHAKE]: '',
  [Action.DECORATE]: 'assets/images/cocktail.png',
  [Action.POUR]: 'assets/images/water.png',
};
