import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { argsToTemplate, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { CheckboxComponent } from './checkbox.component';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

const formGroup = new FormGroup({
  checkbox: new FormControl(false),
});

const meta: Meta<CheckboxComponent> = {
  component: CheckboxComponent,
  tags: ['autodocs'],
  title: 'checkbox',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, MatCheckboxModule, ReactiveFormsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

export const Primary: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
  },
  render: args => ({
    props: { ...args, formGroup: formGroup },
    template: `
      <form [formGroup]="formGroup">
        <c-ui-checkbox formControlName="checkbox" ${argsToTemplate(args)}></c-ui-checkbox>
      </form>
    `,
  }),
};
