import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import dotenv from 'dotenv';
import findConfig from 'find-config';

const envPath = findConfig('.env');
if (envPath) {
  dotenv.config({ path: envPath });
}

export default defineConfig({
  root: '.',
  esbuild: {
    tsconfigRaw: '{}',
  },
  test: {
    clearMocks: true,
    globals: true,
  },
  resolve: {
    alias: [{ find: '~', replacement: resolve(__dirname, 'src') }],
  },
});
