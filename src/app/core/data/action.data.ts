import { Action } from '@frontend/src/app/core/model/cocktails.model';
import { SelectOptions } from '@frontend/src/app/shared/forms/controls/select/select';

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
