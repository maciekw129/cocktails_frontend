import {
  DestroyRef,
  Directive,
  EventEmitter,
  inject,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup, NgForm, NonNullableFormBuilder } from '@angular/forms';
import { FormService } from '@src/app/shared/forms/form.service';

@Directive()
export abstract class FormComponent<T extends object, F extends FormGroup>
  implements OnInit
{
  @ViewChild('ngForm') ngForm: NgForm;

  @Output() formSubmit = new EventEmitter<T>();

  protected fb = inject(NonNullableFormBuilder);
  protected formService = inject(FormService);
  protected destroyRef = inject(DestroyRef);

  public form: F;

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
