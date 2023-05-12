import { defineConfig } from 'vite';
import { resolve } from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import reactRefresh from '@vitejs/plugin-react-refresh';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [tsconfigPaths(), reactRefresh(), dts()],
  server: {
    port: 3000,
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/OrpheusBind.tsx'),
      name: 'OrpheusBind',
      fileName: (format) => `orpheus-bind.${format}.js`,
    },
    rollupOptions: {
      external: (id) => /^react/.test(id),
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  },
});
