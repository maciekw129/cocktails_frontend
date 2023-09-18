import { Unit } from '@app/core/model/cocktails.model';
import { SelectOptions } from '@app/shared/forms/controls/select/select';

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
