import { Pipe, PipeTransform } from '@angular/core';
import { HeroImagesValue } from '@src/app/core/components/hero/hero.model';
import { heroImages } from '@src/app/core/components/hero/hero.data';

@Pipe({
  name: 'heroImage',
  standalone: true,
})
export class HeroImagePipe implements PipeTransform {
  transform(image: HeroImagesValue): string {
    return heroImages[image];
  }
}
