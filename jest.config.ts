import type { Config } from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
  preset: 'ts-jest',
  verbose: true,
  testMatch: ['**/**/*.test.ts?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  setupFilesAfterEnv: ['jest-extended/all']
};

export default config;
