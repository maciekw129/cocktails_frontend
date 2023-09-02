import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NgForm,
  NonNullableFormBuilder,
} from '@angular/forms';
import { FormService } from '@app/shared/forms/form.service';

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
  @ViewChild('ngForm') ngForm: NgForm;
  @Output()
  formSubmit = new EventEmitter<T>();
  @Input() isRequestPending = false;

  protected fb = inject(NonNullableFormBuilder);
  protected formService = inject(FormService);

  form!: F;

  ngOnInit() {
    this.form = this.buildForm();
  }

  protected abstract buildForm(): F;

  protected abstract setEmittingValue(): T;

  protected afterSubmit() {
    return;
  }

  protected resetForm(): void {
    this.form.reset();
    this.ngForm.resetForm();
  }

  public handleSubmit(): void {
    this.formService.emitFormSubmit();
    if (this.form.invalid) return;

    this.formSubmit.emit(this.setEmittingValue());
    this.afterSubmit();
  }
}
