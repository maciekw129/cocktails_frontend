import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  globalSetup: 'jest-preset-angular/global-setup',
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/app/$1',
    '@src/(.*)': '<rootDir>/src/$1',
    '@styles/(.*)': '<rootDir>/src/styles/$1',
  },
};

export default config;
