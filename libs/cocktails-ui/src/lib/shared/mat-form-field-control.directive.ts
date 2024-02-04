import { MatFormFieldControl } from '@angular/material/form-field';
import {
  ControlValueAccessor,
  FormGroupDirective,
  NgControl,
  NgForm,
} from '@angular/forms';
import { Subject } from 'rxjs';
import {
  Directive,
  DoCheck,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  Optional,
  Self,
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Directive({
  selector: '[uiMatFormFieldControl]',
  standalone: true,
  providers: [
    { provide: MatFormFieldControl, useExisting: MatFormFieldControlDirective },
  ],
})
export class MatFormFieldControlDirective<T>
  implements MatFormFieldControl<T>, ControlValueAccessor, DoCheck, OnDestroy
{
  public static nextId = 0;

  public static generateNextId() {
    return `custom-control-${MatFormFieldControlDirective.nextId++}`;
  }

  @HostBinding() readonly id = MatFormFieldControlDirective.generateNextId();

  @Input() hint: string;
  @Input() icon: string;
  @Input() label: string;
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('aria-describedby') userAriaDescribedBy: string = null;
  @Input() controlType = 'custom-input';
  @Input() type = 'text';

  readonly shouldLabelFloat: boolean;
  public touched = false;
  public focused = false;
  readonly autofilled: boolean;

  public readonly stateChanges = new Subject<void>();

  @Input()
  get value(): T {
    return this._value;
  }
  set value(value: T) {
    this._value = value;
    this.stateChanges.next();
  }
  private _value: T | null;

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(value) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder: string;

  @Input()
  get required() {
    return this._required;
  }
  set required(value) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _disabled = false;

  get empty() {
    return !this.value;
  }

  get errorState() {
    return this._errorState;
  }
  set errorState(value) {
    this._errorState = value;
    this.stateChanges.next();
  }
  private _errorState = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChange = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched = () => {};

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    @Optional() private _parentForm: NgForm,
    @Optional() private _parentFormGroup: FormGroupDirective,
    private _elementRef: ElementRef<HTMLElement>
  ) {
    if (this.ngControl !== null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngDoCheck() {
    if (this.ngControl) {
      this.updateErrorState();
    }
  }

  writeValue(value: T | null) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onContainerClick(event: MouseEvent): void {
    this._elementRef.nativeElement.focus();
  }

  onFocusIn(event: FocusEvent) {
    if (!this.focused) {
      this.focused = true;
      this.stateChanges.next();
    }
  }

  onFocusOut(event: FocusEvent) {
    if (!this._elementRef.nativeElement.contains(event.relatedTarget as Element)) {
      this.touched = true;
      this.focused = false;
      this.onTouched();
      this.stateChanges.next();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setDescribedByIds(ids: string[]): void {}

  private updateErrorState() {
    const parent = this._parentFormGroup || this._parentForm;
    const oldState = this.errorState;
    const newState = this.ngControl?.invalid && (this.touched || parent.submitted);

    if (oldState !== newState) {
      this.errorState = newState;
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete();
  }
}
