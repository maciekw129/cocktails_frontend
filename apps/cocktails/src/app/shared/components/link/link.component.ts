import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'c-link',
  standalone: true,
  template: `
    <a class="link" [href]="href" [routerLink]="routerLink">
      <ng-content></ng-content>
    </a>
  `,
  styleUrls: ['link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class LinkComponent implements OnInit {
  @Input() href = '';
  @Input() routerLink: string | null = null;

  ngOnInit() {
    if (!this.href) {
      console.warn("c-link: You haven't provided href attribute.");
    }
  }
}
