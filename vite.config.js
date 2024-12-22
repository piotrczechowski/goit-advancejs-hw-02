import { defineConfig } from 'vite';
import ghPages from 'vite-plugin-gh-pages';

export default defineConfig({
  plugins: [ghPages()],
  base: 'https://github.com/piotrczechowski/goit-advancejs-hw-02', 

  build: {
    outDir: 'dist', // Directory where the build files are generated
    assetsDir: 'assets', // Directory for static assets
    rollupOptions: {
      input: {
        main: 'index.html', // Entry point of the application
      },
    },
  },

});
