import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { HeroComponent } from '@app/core/hero/hero.component';
import { MatTabsModule } from '@angular/material/tabs';
import { UserDataFormComponent } from '@src/app/modules/user-profile/forms/user-data-form/user-data-form.component';
import { PatchUserDto } from '@src/app/modules/user-profile/user-profile.model';
import { UserProfileApiService } from '@src/app/modules/user-profile/user-profile-api.service';
import { switchMap, tap } from 'rxjs';
import { ConfirmationDialogService } from '@src/app/shared/components/confirmation-dialog/confirmation-dialog.service';
import { AuthStatefulService } from '@src/app/auth/auth-stateful.service';
import { UserData } from '@src/app/auth/auth.model';

@Component({
  selector: 'c-user-profile',
  standalone: true,
  imports: [HeroComponent, MatTabsModule, UserDataFormComponent],
  templateUrl: './user-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent {
  @ViewChild(UserDataFormComponent)
  userDataFormComponent: UserDataFormComponent;

  private userProfileApiService = inject(UserProfileApiService);
  private confirmationDialogService = inject(ConfirmationDialogService);
  private authStatefulService = inject(AuthStatefulService);

  public handlePatchUser(userData: PatchUserDto) {
    this.confirmationDialogService
      .openConfirmationDialog$()
      .pipe(
        switchMap(() => this.userProfileApiService.patchUserData(userData)),
        tap((userData: UserData) => {
          this.authStatefulService.patchState({ userData });
          this.userDataFormComponent.handleCancelEdit();
        })
      )
      .subscribe();
  }
}
