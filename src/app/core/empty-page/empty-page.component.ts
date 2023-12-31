import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '@app/core/hero/hero.component';
import { LinkComponent } from '@app/shared/components/link/link.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'c-empty-page',
  standalone: true,
  imports: [CommonModule, HeroComponent, LinkComponent, MatCardModule],
  templateUrl: './empty-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyPageComponent {}
