import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/main.js',
  dest: 'dist/bundle.js',
  format: 'umd',
  plugins: [ babel() ]
};