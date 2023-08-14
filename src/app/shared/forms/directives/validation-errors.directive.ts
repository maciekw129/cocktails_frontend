import {Directive, ElementRef, inject, Input, Renderer2} from '@angular/core';
import {ValidationErrors} from "@angular/forms";

@Directive({
  selector: 'mat-error[errors]',
  standalone: true,
})
export class ValidationErrorsDirective {
  @Input() errors: ValidationErrors | null = null;


  private renderer = inject(Renderer2);
  private element = inject(ElementRef);

  ngOnInit() {

  }

  private generateErrorText() {
    const p = this.renderer.createElement('p');
  }
}
