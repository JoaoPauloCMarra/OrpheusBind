import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';
import reactRefresh from '@vitejs/plugin-react-refresh';

export default defineConfig({
  plugins: [dts(), tsconfigPaths(), reactRefresh()],
  server: {
    port: 3000,
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/OrpheusBind.tsx'),
      name: 'OrpheusBind',
      fileName: 'orpheus-bind',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'rxjs'],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  },
});
