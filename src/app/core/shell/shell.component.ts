import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeroComponent } from '../../modules/home/components/hero/hero.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GlobalLoaderService } from '../global-loader/global-loader.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'c-shell',
  standalone: true,
  template: `
    <div>
      <mat-progress-bar *ngIf='isLoading$ | async' mode="indeterminate" value="40"></mat-progress-bar>
      <c-navbar class="main-container" />
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  imports: [RouterOutlet, NavbarComponent, HeroComponent, MatProgressBarModule, AsyncPipe, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ShellComponent {
  private globalLoaderService = inject(GlobalLoaderService);

  isLoading$ = this.globalLoaderService.getStateSlice('isLoading');
}
