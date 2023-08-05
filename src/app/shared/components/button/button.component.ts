import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {Design, Type} from "./button.model";
import {ThemePalette} from "@angular/material/core";
import {NgIf, NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'c-button',
  standalone: true,
  imports: [MatButtonModule, NgIf, NgTemplateOutlet],
  template: `
    <button
      *ngIf="design === 'primary'; else secondaryButton"
      mat-flat-button
      [color]="color"
      (click)="handleClick()"
      [disabled]="disabled"
      [type]="type"
    ><ng-container *ngTemplateOutlet="content"></ng-container></button>

    <ng-template #secondaryButton>
      <button
        mat-stroked-button
        class="button--secondary"
        [color]="color"
        (click)="handleClick()"
        [disabled]="disabled"
        [type]="type"
      ><ng-container *ngTemplateOutlet="content"></ng-container></button>
    </ng-template>

    <ng-template #content>
      <div class="flex flex--center gap-1 font-text-1">
        <ng-content></ng-content>
      </div>
    </ng-template>
  `,
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();
  @Input() design: Design = 'primary';
  @Input() color: ThemePalette = 'primary';
  @Input() disabled: boolean = false;
  @Input() type: Type = 'button';

  public handleClick() {
    this.buttonClick.emit();
  }
}
