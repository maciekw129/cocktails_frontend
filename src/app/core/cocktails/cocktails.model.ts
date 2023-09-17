import { Cocktail } from '@app/modules/create-cocktail/create-cocktail.model';

export interface CocktailApi extends Cocktail {
  id: string;
}
