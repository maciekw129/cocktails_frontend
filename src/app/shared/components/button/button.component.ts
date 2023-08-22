import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Design, Type } from './button.model';
import { ThemePalette } from '@angular/material/core';
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'c-button',
  standalone: true,
  imports: [
    MatButtonModule,
    NgIf,
    NgTemplateOutlet,
    TranslateModule,
    AsyncPipe,
    MatProgressBarModule,
  ],
  template: `
    <button
      *ngIf="design === 'primary'; else secondaryButton"
      mat-flat-button
      [color]="color"
      (click)="handleClick()"
      [disabled]="disabled || isLoading"
      [type]="type">
      <ng-container *ngTemplateOutlet="content"></ng-container>
    </button>

    <ng-template #secondaryButton>
      <button
        mat-stroked-button
        class="button--secondary"
        [color]="color"
        (click)="handleClick()"
        [disabled]="disabled || isLoading"
        [type]="type">
        <ng-container *ngTemplateOutlet="content"></ng-container>
      </button>
    </ng-template>

    <ng-template #content>
      <div class="flex flex--center gap-1 font-text-1">
        {{ fullTranslation | translate }}
        <ng-content></ng-content>
      </div>
      <mat-progress-bar
        *ngIf="isLoading"
        class="margin-top-1"
        mode="indeterminate"
        value="40"
        color="accent"></mat-progress-bar>
    </ng-template>
  `,
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();
  @Input() design: Design = 'primary';
  @Input() color: ThemePalette = 'primary';
  @Input() disabled = false;
  @Input() type: Type = 'button';
  @Input() translation = '';
  @Input() isLoading = false;

  get fullTranslation() {
    return this.translation ? `buttons.${this.translation}` : '';
  }

  public handleClick() {
    this.buttonClick.emit();
  }
}
