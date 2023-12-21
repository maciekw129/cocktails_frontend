import { FormControl } from '@angular/forms';

export class FormUtils {
  public static getControlName(control: FormControl): string | null {
    if (control.parent) {
      const formGroup = control.parent;
      return (
        Object.keys(formGroup.controls).find(name => {
          return (
            control ===
            formGroup.controls[name as keyof typeof formGroup.controls.keys]
          );
        }) || null
      );
    }

    return null;
  }
}
