import { Action } from '@src/app/core/model/cocktails.model';

export const actionIcons: Record<Action, string> = {
  [Action.SQUEEZE]: 'assets/images/juicer.png',
  [Action.MIX]: 'assets/images/mix.png',
  [Action.ADD]: 'assets/images/put.png',
  [Action.WAIT]: 'assets/images/hourglass.png',
  [Action.SHAKE]: 'assets/images/shaker.png',
  [Action.DECORATE]: 'assets/images/cocktail.png',
  [Action.POUR]: 'assets/images/water.png',
};
