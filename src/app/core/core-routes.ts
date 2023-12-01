import { Route } from '@angular/router';
import ShellComponent from '@app/core/shell/shell.component';
import { HomeComponent } from '@app/modules/home/home.component';
import { importProvidersFrom } from '@angular/core';
import { StatefulServiceModule } from 'ngx-stateful-service';
import { HomeState } from '@app/modules/home/home.model';
import { AuthGuards } from '@app/auth/auth.guards';
import { IngredientsResolver } from '@app/modules/cocktails/create-cocktail/ingredients.resolver';
import {
  CocktailDetailState,
  CreateCocktailState,
} from '@app/modules/cocktails/cocktails.model';
import { CocktailResolver } from '@app/modules/cocktails/cocktail-detail/cocktail.resolver';

export const CORE_ROUTES: Route[] = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        providers: [
          importProvidersFrom(
            StatefulServiceModule.withConfig<HomeState>({
              initialState: {
                cocktails: [],
                pageMeta: null,
                filters: null,
                page: 1,
              },
            })
          ),
        ],
      },
      {
        path: 'create-cocktail',
        canActivate: [AuthGuards.authentication()],
        resolve: {
          ingredients: IngredientsResolver,
        },
        loadComponent: () =>
          import(
            '@src/app/modules/cocktails/create-cocktail/create-cocktail.component'
          ).then(m => m.CreateCocktailComponent),
        providers: [
          importProvidersFrom(
            StatefulServiceModule.withConfig<CreateCocktailState>({
              initialState: {
                cocktail: null,
                ingredients: [],
              },
            })
          ),
        ],
      },
      {
        path: 'cocktail/:id',
        resolve: {
          cocktail: CocktailResolver,
        },
        loadComponent: () =>
          import(
            '@src/app/modules/cocktails/cocktail-detail/cocktail-detail.component'
          ).then(m => m.CocktailDetailComponent),
        providers: [
          importProvidersFrom(
            StatefulServiceModule.withConfig<CocktailDetailState>({
              initialState: {
                cocktail: null,
              },
            })
          ),
        ],
      },
      {
        path: 'user-profile',
        canActivate: [AuthGuards.authentication()],
        loadComponent: () =>
          import('@src/app/modules/user-profile/user-profile.component').then(
            m => m.UserProfileComponent
          ),
      },
      {
        path: '**',
        loadComponent: () =>
          import('@app/core/empty-page/empty-page.component').then(
            m => m.EmptyPageComponent
          ),
      },
    ],
  },
];
