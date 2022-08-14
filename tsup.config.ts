import {defineConfig} from "tsup";

export default defineConfig({
  entry: ['src/memoizerific.ts'],
  format: 'esm'
});
