import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EmptyPageComponent } from './empty-page.component';

describe('EmptyPageComponent', () => {
  let component: EmptyPageComponent;
  let fixture: ComponentFixture<EmptyPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EmptyPageComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Created component', () => {
    expect(component).toBeTruthy();
  });
});
