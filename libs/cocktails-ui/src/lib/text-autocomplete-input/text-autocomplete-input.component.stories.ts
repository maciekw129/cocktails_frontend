import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { argsToTemplate, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TextAutocompleteInputComponent } from '@cocktails-ui';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { ValidationErrorsDirective } from '@app/shared/forms/directives/validation-errors.directive';

const formGroup = new FormGroup({
  textAutocompleteInput: new FormControl(''),
  textAutocompleteInputWithError: new FormControl('', () => ({ exampleError: true })),
});

formGroup.controls.textAutocompleteInputWithError.markAsTouched();

const meta: Meta<TextAutocompleteInputComponent> = {
  component: TextAutocompleteInputComponent,
  tags: ['autodocs'],
  title: 'text-autocomplete-input',
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatOptionModule,
        ReactiveFormsModule,
        ValidationErrorsDirective,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<TextAutocompleteInputComponent>;

export const Primary: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    icon: 'favorite',
    hint: 'This is an example hint.',
    options: ['value', 'secondValue'],
  },
  render: args => ({
    props: { ...args, formGroup: formGroup },
    template: `
      <form [formGroup]="formGroup">
        <c-ui-text-autocomplete-input formControlName="textAutocompleteInput" ${argsToTemplate(
          args
        )}></c-ui-text-autocomplete-input>
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
        <c-ui-text-autocomplete-input formControlName="textAutocompleteInputWithError" ${argsToTemplate(
          args
        )}></c-ui-text-autocomplete-input>
      </form>
    `,
  }),
};
