import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'c-link',
  standalone: true,
  template: `
    <a class="link font-text-1" [href]="href">
      <ng-content></ng-content>
    </a>
  `,
  styleUrls: ['link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent implements OnInit {
  @Input() href: string = '';

  ngOnInit() {
    if (!this.href) {
      console.warn("c-link: You haven't provided href attribute.");
    }
  }
}
