import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@src/app/core/components/navbar/navbar.component';
import { HeroComponent } from '@src/app/core/components/hero/hero.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GlobalLoaderService } from '@src/app/core/shell/global-loader/global-loader.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { FooterComponent } from '@src/app/core/components/footer/footer.component';

@Component({
  selector: 'c-shell',
  standalone: true,
  template: `
    <div class="shell flex flex--column">
      <mat-progress-bar
        class="loader"
        *ngIf="isLoading$ | async"
        mode="indeterminate"
        value="40"></mat-progress-bar>
      <c-navbar />
      <main>
        <router-outlet></router-outlet>
      </main>
      <c-footer class="footer" />
    </div>
  `,
  styles: [
    '.shell {min-height: 100vh} .loader {position: fixed; z-index: 999} .footer {margin-top: auto}',
  ],
  imports: [
    RouterOutlet,
    NavbarComponent,
    HeroComponent,
    MatProgressBarModule,
    AsyncPipe,
    NgIf,
    FooterComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ShellComponent {
  private globalLoaderService = inject(GlobalLoaderService);

  isLoading$ = this.globalLoaderService.getStateSlice('isLoading');
}
