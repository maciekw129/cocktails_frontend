import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {Design, Type} from "./button.model";
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'c-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './button.component.html',
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
