import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { RegisterDialogComponent } from './register-dialog.component';
import { AuthStatefulService } from '@app/auth/auth-stateful.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LinkComponent } from '@app/shared/components/link/link.component';
import { RegisterFormComponent } from '@app/auth/forms/register-form/register-form.component';
import { EMPTY } from 'rxjs';

describe('RegisterDialogComponent', () => {
  beforeEach(() =>
    MockBuilder(RegisterDialogComponent)
      .mock(AuthStatefulService, {
        register: () => EMPTY,
      })
      .mock(MatDialogRef<RegisterDialogComponent>)
      .mock(MatDialog)
  );

  it('created component', () => {
    const fixture = MockRender(RegisterDialogComponent);

    expect(fixture).toBeTruthy();
  });

  it('called openLogin method when login link is clicked', () => {
    const fixture = MockRender(RegisterDialogComponent);
    const component = fixture.point.componentInstance;
    const spy = jest.spyOn(component, 'openLogin');
    const linkComponent = ngMocks.find(fixture, LinkComponent);

    ngMocks.click(linkComponent);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('called register method when register-form is submitted', () => {
    const fixture = MockRender(RegisterDialogComponent);
    const component = fixture.point.componentInstance;
    const spy = jest.spyOn(component, 'register');
    const registerForm = ngMocks.find(fixture, RegisterFormComponent);

    registerForm.componentInstance.formSubmit.emit();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
