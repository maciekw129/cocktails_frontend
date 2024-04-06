import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from '@src/app/shared/forms/form.component';
import { FormService } from '@src/app/shared/forms/form.service';
import { PatchUserDto, UserData } from '@src/app/modules/user-profile/user-profile.model';
import { UserDataForm } from '@src/app/modules/user-profile/forms/user-data-form/user-data-form.model';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { USER_DATA, USER_DATA_VALUE } from '@src/app/auth/auth.tokens';
import { BehaviorSubject, take, tap } from 'rxjs';
import { ButtonComponent } from '@src/app/shared/components/button/button.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TextInputComponent } from '@cocktails-ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'c-user-data-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    ButtonComponent,
    MatTooltipModule,
    TextInputComponent,
  ],
  templateUrl: './user-data-form.component.html',
  providers: [FormService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDataFormComponent
  extends FormComponent<PatchUserDto, FormGroup<UserDataForm>>
  implements OnInit
{
  private userData$ = inject(USER_DATA);
  private userData = inject(USER_DATA_VALUE);

  isEditMode$ = new BehaviorSubject<boolean>(false);

  get firstNameControl() {
    return this.form.controls.firstName;
  }

  get lastNameControl() {
    return this.form.controls.lastName;
  }

  override ngOnInit() {
    super.ngOnInit();

    this.listenModeChange().subscribe();
  }

  protected buildForm() {
    const { login, email, firstName, lastName } = this.userData;

    return this.fb.group<UserDataForm>({
      login: this.fb.control<string>({ value: login, disabled: true }),
      email: this.fb.control<string>({ value: email, disabled: true }),
      firstName: this.fb.control(firstName),
      lastName: this.fb.control<string>(lastName),
    });
  }

  private listenModeChange() {
    return this.isEditMode$.pipe(
      takeUntilDestroyed(this.destroyRef),
      tap(isEditMode => {
        if (isEditMode) {
          this.firstNameControl.enable();
          this.lastNameControl.enable();
        } else {
          this.firstNameControl.disable();
          this.lastNameControl.disable();
        }
      })
    );
  }

  public handleSetEditMode() {
    this.isEditMode$.next(true);
  }

  public handleCancelEdit() {
    this.userData$
      .pipe(
        take(1),
        tap((userData: UserData) => {
          this.form.reset(userData);
          this.isEditMode$.next(false);
        })
      )
      .subscribe();
  }

  protected setEmittingValue() {
    return {
      firstName: this.firstNameControl.value,
      lastName: this.lastNameControl.value,
    };
  }
}
