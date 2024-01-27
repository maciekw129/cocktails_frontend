import { Pipe, PipeTransform } from '@angular/core';
import { UserData } from '@app/auth/auth.model';

@Pipe({
  name: 'author',
  standalone: true,
})
export class AuthorPipe implements PipeTransform {
  transform(value: UserData): string {
    const { firstName, lastName, login } = value;

    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    }

    return login;
  }
}
