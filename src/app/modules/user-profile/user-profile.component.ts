import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '@app/core/components/hero/hero.component';
import { MatTabsModule } from '@angular/material/tabs';
import { UserDataFormComponent } from '@app/modules/user-profile/forms/user-data-form/user-data-form.component';
import { PatchUserDto } from '@app/modules/user-profile/user-profile.model';
import { UserProfileApiService } from '@app/modules/user-profile/user-profile-api.service';
import { switchMap, tap } from 'rxjs';
import { ConfirmationDialogService } from '@app/shared/components/confirmation-dialog/confirmation-dialog.service';
import { AuthStatefulService } from '@app/auth/auth-stateful.service';
import { UserData } from '@app/auth/auth.model';

@Component({
  selector: 'c-user-profile',
  standalone: true,
  imports: [CommonModule, HeroComponent, MatTabsModule, UserDataFormComponent],
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
