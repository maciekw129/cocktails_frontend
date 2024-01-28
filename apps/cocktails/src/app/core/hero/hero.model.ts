import { heroImages } from '@app/core/hero/hero.data';

export type HeroImages = keyof typeof heroImages;

export type HeroVariant = 'normal' | 'large';
