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
import { Observable, take, tap } from 'rxjs';
import { MatFormFieldControl } from '@angular/material/form-field';

@Component({ template: '' })
export abstract class CustomControl<T>
  implements MatFormFieldControl<T>, ControlValueAccessor, OnInit
{
  @Input() formControlName!: string;
  @Input() type = 'text';
  @Input() placeholder: string;
  @Input() required: boolean;

  private injector = inject(Injector);
  private cdr = inject(ChangeDetectorRef);
  private formService = inject(FormService);

  readonly autofilled: boolean;
  readonly controlType: string;
  readonly empty: boolean;
  readonly errorState: boolean;
  readonly focused: boolean;
  readonly id: string;
  readonly shouldLabelFloat: boolean;
  readonly stateChanges: Observable<void>;
  readonly userAriaDescribedBy: string;
  disabled: boolean;
  value: T | null;

  readonly ngControl: NgControl;

  control!: FormControl<T>;

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

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}

  writeValue(obj: any): void {}

  onContainerClick(event: MouseEvent): void {}

  setDescribedByIds(ids: string[]): void {}
}
