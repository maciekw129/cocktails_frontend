import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { argsToTemplate, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TextareaInputComponent } from './textarea-input.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { ValidationErrorsDirective } from '../../../../../apps/cocktails/src/app/shared/forms/directives/validation-errors.directive';

const formGroup = new FormGroup({
  textareaInput: new FormControl(''),
  textareaInputWithError: new FormControl('', () => ({ exampleError: true })),
});

formGroup.controls.textareaInputWithError.markAsTouched();

const meta: Meta<TextareaInputComponent> = {
  component: TextareaInputComponent,
  tags: ['autodocs'],
  title: 'textarea-input',
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        TextFieldModule,
        ValidationErrorsDirective,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<TextareaInputComponent>;

export const Primary: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    hint: 'This is an example hint.',
    minRows: 5,
    maxRows: 15,
  },
  render: args => ({
    props: { ...args, formGroup: formGroup },
    template: `
      <form [formGroup]="formGroup">
        <c-ui-textarea-input formControlName="textareaInput" ${argsToTemplate(
          args
        )}></c-ui-textarea-input>
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
        <c-ui-textarea-input formControlName="textareaInputWithError" ${argsToTemplate(
          args
        )}></c-ui-textarea-input>
      </form>
    `,
  }),
};
