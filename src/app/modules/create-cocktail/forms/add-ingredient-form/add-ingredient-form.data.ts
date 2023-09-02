import { Units } from '@app/modules/create-cocktail/forms/add-ingredient-form/add-ingredient-form.model';
import { SelectOptions } from '@app/shared/forms/controls/select/select';

export const unitLabels: Record<Units, string> = {
  [Units.pcs]: 'pcs',
  [Units.g]: 'g',
  [Units.l]: 'l',
  [Units.ml]: 'ml',
};

export const unitOptions: SelectOptions<Units> = [
  { value: Units.g, label: unitLabels[Units.g] },
  { value: Units.l, label: unitLabels[Units.l] },
  { value: Units.ml, label: unitLabels[Units.ml] },
  { value: Units.pcs, label: unitLabels[Units.pcs] },
];
