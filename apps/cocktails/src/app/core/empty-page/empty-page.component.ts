import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from '@app/core/hero/hero.component';
import { LinkComponent } from '@cocktails-ui';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'c-empty-page',
  standalone: true,
  imports: [HeroComponent, LinkComponent, MatCardModule],
  templateUrl: './empty-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyPageComponent {}
