import {
  ControlValueAccessor,
  FormControl,
  FormControlName,
  FormGroupDirective,
  NgControl,
} from '@angular/forms';
import {
  ChangeDetectorRef,
  Component,
  inject,
  Injector,
  Input,
  OnInit,
} from '@angular/core';
import { FormService } from '@src/app/shared/forms/form.service';
import { take, tap } from 'rxjs';

@Component({ template: '' })
// eslint-disable-next-line @angular-eslint/component-class-suffix
export abstract class CustomControl<T> implements ControlValueAccessor, OnInit {
  @Input() formControlName!: string;
  @Input() type = 'text';
  @Input() isDisabled = false;

  private injector = inject(Injector);
  private cdr = inject(ChangeDetectorRef);
  private formService = inject(FormService);

  control!: FormControl<T>;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange = (value: T) => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: any = () => {};

  ngOnInit() {
    this.validateRequiredInputs();
    this.initializeControl();

    this.formService.formSubmit$
      .pipe(
        take(1),
        tap(() => {
          this.cdr.detectChanges();
        })
      )
      .subscribe();
  }

  private validateRequiredInputs() {
    if (!this.formControlName)
      throw new Error(
        "Input 'formControlName' is required in custom-control based components."
      );
  }

  private initializeControl() {
    const control = this.injector.get(NgControl);
    const formGroup = this.injector.get(FormGroupDirective);

    this.control = formGroup.getControl(control as FormControlName);
  }

  handleChange() {
    this.onChange(this.control.value);
  }

  writeValue(value: T): void {
    // if (this.control && this.control.value != value)
    //   this.control.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean) {
    // disabled
    //   ? this.control.disable({ emitEvent: false })
    //   : this.control.enable({ emitEvent: false });
  }
}
