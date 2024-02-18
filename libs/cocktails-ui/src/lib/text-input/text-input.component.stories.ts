import type { Meta, StoryObj } from '@storybook/angular';
import { TextInputComponent } from './text-input.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ValidationErrorsDirective } from '../../../../../apps/cocktails/src/app/shared/forms/directives/validation-errors.directive';

const formGroup = new FormGroup({
  textInput: new FormControl('value'),
  textInputWithError: new FormControl('value', () => ({ exampleError: true })),
});

formGroup.controls.textInputWithError.markAsTouched();

const meta: Meta<TextInputComponent> = {
  component: TextInputComponent,
  tags: ['autodocs'],
  title: 'text-input',
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        ValidationErrorsDirective,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<TextInputComponent>;

export const Primary: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    hint: 'This is an example hint.',
    icon: 'favorite',
  },
  render: args => ({
    props: { ...args, formGroup: formGroup },
    template: `
      <form [formGroup]="formGroup">
        <c-ui-text-input formControlName="textInput" ${argsToTemplate(
          args
        )}></c-ui-text-input>
      </form>
    `,
  }),
};

export const Error: Story = {
  args: Primary.args,
  render: args => ({
    props: { ...args, formGroup: formGroup },
    template: `
      <form [formGroup]="formGroup">
        <c-ui-text-input formControlName="textInputWithError" ${argsToTemplate(
          args
        )}></c-ui-text-input>
      </form>
    `,
  }),
};
