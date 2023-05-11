import typescript from 'rollup-plugin-typescript2';
import del from 'rollup-plugin-delete';

export default {
  input: 'src/OrpheusBind.tsx',
  output: [
    {
      file: 'dist/OrpheusBind.js',
      format: 'esm',
      sourcemap: false,
    },
  ],
  plugins: [
    del({ targets: 'dist/*' }),
    typescript({
      tsconfigOverride: { compilerOptions: { module: 'esnext' } },
    }),
  ],
  external: ['react'],
};
