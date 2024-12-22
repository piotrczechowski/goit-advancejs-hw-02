import { defineConfig } from 'vite';

export default defineConfig({
  base: '/goit-advancejs-hw-02/', // Replace with your GitHub repository name
  build: {
    rollupOptions: {
        input: {
          main: 'index.html', // Main entry point
          
        },
      },
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
