import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { FormService } from './form.service';

type FormFromObj<T extends object> = {
  [P in keyof T]: T[P] extends object
    ? FormGroup<FormFromObj<T[P]>>
    : FormControl<T[P]>;
};

@Component({
  template: '',
})
export abstract class FormComponent<T extends object, F extends FormGroup>
  implements OnInit
{
  @Output() formSubmit = new EventEmitter<T>();

  @Input() isRequestPending = false;

  protected fb = inject(NonNullableFormBuilder);
  private formService = inject(FormService);

  form!: F;

  ngOnInit() {
    this.form = this.buildForm();
  }

  protected abstract buildForm(): F;

  protected abstract setEmittingValue(): T;

  public handleSubmit(): void {
    this.formService.emitFormSubmit();
    if (this.form.invalid) return;

    this.formSubmit.emit(this.setEmittingValue());
  }
}
