import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';

type FormFromObj<T extends object> = {
  [P in keyof T]: T[P] extends object ?  FormGroup<FormFromObj<T[P]>> : FormControl<T[P]>;
};

@Component({ template: '' })
export abstract class FormComponent<T extends object, F extends FormGroup<FormFromObj<T>>> implements OnInit{
  @Output() formSubmit = new EventEmitter<T>;

  protected fb = inject(NonNullableFormBuilder);

  form!: F;

  ngOnInit() {
    this.form = this.buildForm();
  }

  protected abstract buildForm(): F;

  public handleSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.formSubmit.emit(this.form.getRawValue() as T);
  }
}
