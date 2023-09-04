import {
  ChangeDetectorRef,
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
import { UnsubscribeOnDestroy } from '@app/shared/services/unsubscribe-on-destroy';
import { BehaviorSubject, take, tap } from 'rxjs';

type FormFromObj<T extends object> = {
  [P in keyof T]: T[P] extends object
    ? FormGroup<FormFromObj<T[P]>>
    : FormControl<T[P]>;
};

@Component({
  template: '',
})
export abstract class FormComponent<T extends object, F extends FormGroup>
  extends UnsubscribeOnDestroy
  implements OnInit
{
  @ViewChild('ngForm') ngForm: NgForm;
  @Output()
  formSubmit = new EventEmitter<T>();
  @Input() isRequestPending = false;

  protected fb = inject(NonNullableFormBuilder);
  protected formService = inject(FormService);
  private cdr = inject(ChangeDetectorRef);

  form!: F;
  private readonly _wasSubmitClicked$ = new BehaviorSubject<boolean>(false);

  get wasSubmitClicked$() {
    return this._wasSubmitClicked$.asObservable();
  }

  ngOnInit() {
    this.form = this.buildForm();
    this.listenFormSubmit();
  }

  protected abstract buildForm(): F;

  protected abstract setEmittingValue(): T;

  private listenFormSubmit() {
    this.formService.formSubmit$
      .pipe(
        take(1),
        tap(() => this._wasSubmitClicked$.next(true))
      )
      .subscribe();
  }

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
