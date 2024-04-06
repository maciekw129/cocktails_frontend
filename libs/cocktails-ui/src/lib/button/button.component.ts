import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  inject,
  input,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Design, Type } from './button.model';
import { ThemePalette } from '@angular/material/core';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GlobalLoaderService } from '@app/core/global-loader/global-loader.service';

@Component({
  selector: 'c-button',
  standalone: true,
  imports: [
    MatButtonModule,
    NgTemplateOutlet,
    TranslateModule,
    AsyncPipe,
    MatProgressBarModule,
    MatTooltipModule,
  ],
  templateUrl: 'button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  public design = input<Design>('primary');
  public color = input<ThemePalette>('primary');
  public disabled = input(false);
  public type = input<Type>('button');
  public isDisabledOnRequest = input(false);
  public tip = input('');
  public showTip = input(true);
  public translation = input('');

  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  public fullTranslation = computed(() =>
    this.translation() ? `buttons.${this.translation()}` : ''
  );

  public isLoading$ = inject(GlobalLoaderService).getStateSlice$('isLoading');

  public handleClick() {
    this.buttonClick.emit();
  }
}
