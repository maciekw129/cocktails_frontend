import { ChangeDetectorRef, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { FormService } from './form.service';

type FormFromObj<T extends object> = {
  [P in keyof T]: T[P] extends object ?  FormGroup<FormFromObj<T[P]>> : FormControl<T[P]>
};

@Component({
  template: '' ,
})
export abstract class FormComponent<T extends object, F extends FormGroup<FormFromObj<T>>> implements OnInit{
  @Output() formSubmit = new EventEmitter<T>;

  protected fb = inject(NonNullableFormBuilder);
  private cdr = inject(ChangeDetectorRef);
  private formService = inject(FormService);

  form!: F;

  ngOnInit() {
    this.form = this.buildForm();
    Object.values(this.form.controls).forEach(control => {
      control.root
    })
  }

  protected abstract buildForm(): F;

  public handleSubmit(): void {
    this.formService.emitFormSubmit();
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    this.formSubmit.emit(this.form.getRawValue() as T);
  }
}
