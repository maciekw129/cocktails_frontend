import { Pipe, PipeTransform } from '@angular/core';
import { HeroImagesValue } from '@app/core/hero/hero.model';
import { heroImages } from '@app/core/hero/hero.data';

@Pipe({
  name: 'heroImage',
  standalone: true,
})
export class HeroImagePipe implements PipeTransform {
  transform(image: HeroImagesValue): string {
    return heroImages[image];
  }
}
