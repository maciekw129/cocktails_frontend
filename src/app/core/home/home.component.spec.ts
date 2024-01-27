import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { USER_DATA } from '@app/auth/auth.tokens';
import { MockComponent, MockProvider, ngMocks } from 'ng-mocks';
import { CocktailsApiService } from '@app/modules/cocktails/cocktails-api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CocktailsPaginatorFilterComponent } from '@app/modules/cocktails/cocktails-paginator-filter/cocktails-paginator-filter.component';
import { of } from 'rxjs';
import { ButtonComponent } from '@app/shared/components/button/button.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        RouterTestingModule,
        MockComponent(CocktailsPaginatorFilterComponent),
      ],
      providers: [MockProvider(CocktailsApiService)],
    }).compileComponents();
  });

  describe('When user is authorized', () => {
    beforeEach(() => {
      TestBed.overrideProvider(USER_DATA, MockProvider(USER_DATA));
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('Created component', () => {
      expect(component).toBeTruthy();
    });

    it('Shows create new cocktail button', () => {
      TestBed.compileComponents();

      const compiled = fixture.debugElement.nativeElement as HTMLElement;
      const button = compiled.querySelector('.home__button');

      expect(button).toBeTruthy();
    });
  });

  describe('When user is unauthorized', () => {
    beforeEach(() => {
      TestBed.overrideProvider(USER_DATA, { useValue: of(null) });
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('Created component', () => {
      expect(component).toBeTruthy();
    });

    it('Hides create new cocktail button', () => {
      const button = ngMocks.find(fixture.debugElement, ButtonComponent);

      expect(button).toBeFalsy();
    });
  });
});
