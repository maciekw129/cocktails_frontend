import { MockBuilder, MockRender } from 'ng-mocks';
import { LoginFormComponent } from './login-form.component';
import { NonNullableFormBuilder } from '@angular/forms';
import { FormService } from '@app/shared/forms/form.service';

describe('LoginFormComponent', () => {
  beforeEach(() => {
    MockBuilder(LoginFormComponent).mock(NonNullableFormBuilder).mock(FormService);
  });

  it('created component', () => {
    const fixture = MockRender(LoginFormComponent);

    expect(fixture).toBeTruthy();
  });
});
