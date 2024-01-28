import { FormsModule, NonNullableFormBuilder } from '@angular/forms';
import { FormService } from '@app/shared/forms/form.service';
import { MockBuilder, MockRender } from 'ng-mocks';
import { RegisterFormComponent } from './register-form.component';

describe('RegisterFormComponent', () => {
  beforeEach(() =>
    MockBuilder(RegisterFormComponent).keep(FormsModule).mock(FormService)
  );

  it('created component', () => {
    const fixture = MockRender(RegisterFormComponent);

    expect(fixture).toBeTruthy();
  });
});
