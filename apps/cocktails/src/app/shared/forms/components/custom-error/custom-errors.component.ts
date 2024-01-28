import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationErrors } from '@angular/forms';
import { FormService } from '@src/app/shared/forms/form.service';
import { BehaviorSubject, take, tap } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'c-custom-error',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `<p
    *ngIf="(wasSubmitClicked$ | async) && errors"
    class="mat-mdc-form-field-error">
    {{ 'forms.validationErrors.' + firstError | translate: errors[firstError] }}
  </p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomErrorsComponent implements OnInit {
  @Input() errors: ValidationErrors;

  private formService = inject(FormService);

  wasSubmitClicked$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get firstError() {
    return this.errors ? Object.keys(this.errors)[0] : null;
  }

  ngOnInit() {
    this.formService.formSubmit$
      .pipe(
        take(1),
        tap(() => {
          this.wasSubmitClicked$.next(true);
        })
      )
      .subscribe();
  }
}
