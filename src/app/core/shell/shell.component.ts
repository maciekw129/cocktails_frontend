import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeroComponent } from '../hero/hero.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GlobalLoaderService } from '../global-loader/global-loader.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { FooterComponent } from '@app/core/footer/footer.component';

@Component({
  selector: 'c-shell',
  standalone: true,
  template: `
    <div class="shell flex flex--column">
      <mat-progress-bar
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
  styles: ['.shell {min-height: 100vh} .footer {margin-top: auto}'],
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
