import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { argsToTemplate, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { SelectComponent } from './select.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { ValidationErrorsDirective } from '../../../../../apps/cocktails/src/app/shared/forms/directives/validation-errors.directive';
import { SelectOption } from './select.model';

const formGroup = new FormGroup({
  select: new FormControl(''),
  selectWithError: new FormControl('', () => ({ exampleError: true })),
});

formGroup.controls.selectWithError.markAsTouched();

const options: SelectOption<string>[] = [
  { value: 'value', label: 'label' },
  { value: 'second_value', label: 'second label' },
];

const meta: Meta<SelectComponent> = {
  component: SelectComponent,
  tags: ['autodocs'],
  title: 'select',
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        MatFormFieldModule,
        MatOptionModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        ReactiveFormsModule,
        ValidationErrorsDirective,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<SelectComponent>;

export const Primary: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    hint: 'This is an example hint.',
    options: options,
    multiple: false,
  },
  render: args => ({
    props: { ...args, formGroup: formGroup },
    template: `
      <form [formGroup]="formGroup">
        <c-ui-select formControlName="select" ${argsToTemplate(args)}></c-ui-select>
      </form>
    `,
  }),
};

export const Multiple: Story = {
  args: {
    ...Primary.args,
    multiple: true,
  },
  render: args => ({
    props: { ...args, formGroup: formGroup },
    template: `
      <form [formGroup]="formGroup">
        <c-ui-select formControlName="select" ${argsToTemplate(args)}></c-ui-select>
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
        <c-ui-select formControlName="selectWithError" ${argsToTemplate(
          args
        )}></c-ui-select>
      </form>
    `,
  }),
};
