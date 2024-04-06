import {
  DestroyRef,
  Directive,
  HostListener,
  inject,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { combineLatest, distinctUntilChanged, of, Subject, switchMap, tap } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector:
    'input[validationErrors][formControl], textarea[validationErrors][formControl], mat-select[validationErrors][formControl]',
  standalone: true,
  providers: [TranslatePipe],
})
export class ValidationErrorsDirective implements OnInit {
  @Input() formControl!: FormControl;
  @Input() validationErrors!: HTMLElement;
  @Input() errorChange$ = new Subject<void>();

  private renderer = inject(Renderer2);
  private translate = inject(TranslatePipe);
  private destroyRef = inject(DestroyRef);

  private errorText = this.renderer.createText('');

  ngOnInit() {
    this.renderer.appendChild(this.validationErrors, this.errorText);

    this.refreshErrorMessages(this.formControl.errors);

    combineLatest([this.errorChange$, this.formControl.valueChanges])
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(() => of(this.formControl.errors)),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        ),
        tap(errors => this.refreshErrorMessages(errors))
      )
      .subscribe();
  }

  @HostListener('blur') onBlur() {
    this.errorChange$.next();
  }

  private refreshErrorMessages(errors: ValidationErrors | null) {
    if (errors === null) {
      this.renderer.setValue(this.errorText, '');
    } else {
      const errorKeys = Object.keys(errors);
      const errorText = this.translate.transform(
        `forms.validationErrors.${errorKeys[0]}`,
        errors[errorKeys[0]]
      );
      this.renderer.setValue(this.errorText, errorText);
    }
  }
}
