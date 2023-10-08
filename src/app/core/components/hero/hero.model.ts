import { heroImages } from '@src/app/core/components/hero/hero.data';

export type HeroImages = keyof typeof heroImages;

export type HeroImagesValue = (typeof heroImages)[HeroImages];

export type HeroVariant = 'normal' | 'large';
