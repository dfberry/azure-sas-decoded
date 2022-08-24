import type {Config} from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
  preset: 'ts-jest',
  verbose: true,
  "testMatch": ["./**/*.test.ts"]
};
export default config;