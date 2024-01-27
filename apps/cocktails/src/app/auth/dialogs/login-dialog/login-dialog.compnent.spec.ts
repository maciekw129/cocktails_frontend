import { LoginDialogComponent } from './login-dialog.component';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { AuthStatefulService } from '@app/auth/auth-stateful.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginFormComponent } from '@app/auth/forms/login-form/login-form.component';
import { EMPTY } from 'rxjs';
import { LinkComponent } from '@app/shared/components/link/link.component';

describe('LoginDialogComponent', () => {
  beforeEach(() =>
    MockBuilder(LoginDialogComponent)
      .mock(AuthStatefulService, {
        login: () => EMPTY,
      })
      .mock(MatDialogRef<LoginDialogComponent>)
      .mock(MatDialog)
  );

  it('created component', () => {
    const fixture = MockRender(LoginDialogComponent);

    expect(fixture).toBeTruthy();
  });

  it('called register method when register link is clicked', () => {
    const fixture = MockRender(LoginDialogComponent);
    const component = fixture.point.componentInstance;
    const spy = jest.spyOn(component, 'openRegister');
    const linkComponent = ngMocks.find(fixture, LinkComponent);

    ngMocks.click(linkComponent);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('called login method when login-form is submitted', () => {
    const fixture = MockRender(LoginDialogComponent);
    const component = fixture.point.componentInstance;
    const spy = jest.spyOn(component, 'login');
    const loginForm = ngMocks.find(fixture, LoginFormComponent);

    loginForm.componentInstance.formSubmit.emit();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
