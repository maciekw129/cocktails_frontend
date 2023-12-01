import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { HeroImages, HeroVariant } from '@app/core/hero/hero.model';
import { HeroImagePipe } from '@app/core/hero/hero-image.pipe';

@Component({
  selector: 'c-hero',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    MatIconModule,
    RouterLink,
    HeroImagePipe,
  ],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {
  @Input() image: HeroImages;
  @Input() variant: HeroVariant = 'normal';
}
