import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionIconPipe } from '@app/modules/cocktail-detail/components/preparation-step/pipes/action-icon.pipe';
import { ActionLabelPipe } from '@app/modules/cocktail-detail/components/preparation-step/pipes/action-label.pipe';
import { PreparationStep } from '@app/core/model/cocktails.model';

@Component({
  selector: 'c-preparation-step',
  standalone: true,
  imports: [CommonModule, ActionIconPipe, ActionLabelPipe],
  templateUrl: './preparation-step.component.html',
  styleUrls: ['./preparation-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreparationStepComponent {
  @Input() step: PreparationStep;
}
