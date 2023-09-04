import { SelectOptions } from '@app/shared/forms/controls/select/select';
import { Unit } from '@app/modules/create-cocktail/create-cocktail.model';

export const unitLabels: Record<Unit, string> = {
  [Unit.pcs]: 'pcs',
  [Unit.g]: 'g',
  [Unit.l]: 'l',
  [Unit.ml]: 'ml',
};

export const unitOptions: SelectOptions<Unit> = [
  { value: Unit.g, label: unitLabels[Unit.g] },
  { value: Unit.l, label: unitLabels[Unit.l] },
  { value: Unit.ml, label: unitLabels[Unit.ml] },
  { value: Unit.pcs, label: unitLabels[Unit.pcs] },
];
