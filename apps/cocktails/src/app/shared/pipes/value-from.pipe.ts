import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valueFrom',
  standalone: true,
})
export class valueFromPipe<T extends string | number> implements PipeTransform {
  transform(value: T, object: Record<T, string>): string {
    return object[value];
  }
}
