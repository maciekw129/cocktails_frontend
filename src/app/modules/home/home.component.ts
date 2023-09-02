import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '@app/core/hero/hero.component';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { USER_DATA } from '@app/auth/auth.tokens';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    ButtonComponent,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  public isAuthorized = inject(USER_DATA).pipe(
    map(userData => Boolean(userData))
  );
}
