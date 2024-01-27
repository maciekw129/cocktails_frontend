import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '@app/core/navbar/navbar.component';
import { HeroComponent } from '@app/core/hero/hero.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GlobalLoaderService } from '@app/core/global-loader/global-loader.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '@app/core/footer/footer.component';

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
  styleUrls: ['shell.component.scss'],
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    HeroComponent,
    MatProgressBarModule,
    FooterComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ShellComponent {
  private globalLoaderService = inject(GlobalLoaderService);

  isLoading$ = this.globalLoaderService.getStateSlice$('isLoading');
}
