import { heroImages } from '@app/core/hero/hero.data';

export type HeroImages = keyof typeof heroImages;

export type HeroImagesValue = (typeof heroImages)[HeroImages];

export type HeroVariant = 'normal' | 'large';
