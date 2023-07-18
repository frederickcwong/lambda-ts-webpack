import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  testMatch: ['<rootDir>/src/__tests__/**/*.ts'],
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '@handlers/(.*)': '<rootDir>/src/handlers/$1',
    '@utils/(.*)': '<rootDir>/src/utils/$1',
  },
};
export default config;
