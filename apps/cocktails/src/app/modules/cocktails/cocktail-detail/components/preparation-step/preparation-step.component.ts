import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PreparationStep } from '@app/modules/cocktails/cocktails.model';
import { valueFromPipe } from '@app/shared/pipes/value-from.pipe';
import { actionIcons, actionLabels } from '@app/modules/cocktails/cocktails.data';

@Component({
  selector: 'c-preparation-step',
  standalone: true,
  imports: [valueFromPipe],
  templateUrl: './preparation-step.component.html',
  styleUrls: ['./preparation-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreparationStepComponent {
  @Input() step: PreparationStep;

  protected readonly actionLabels = actionLabels;
  protected readonly actionIcons = actionIcons;
}
