import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[stopEventPropagation]',
  standalone: true,
})
export class StopEventPropagationDirective {
  @HostListener('click', ['$event']) onClick(event: Event) {
    event.stopPropagation();
  }
}
