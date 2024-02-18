import { moduleMetadata } from '@storybook/angular';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const decorators = [
  moduleMetadata({
    imports: [TranslateModule.forRoot(), BrowserAnimationsModule],
  }),
];
