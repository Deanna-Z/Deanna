import { defineConfig } from 'vite';

export default defineConfig({
  base: '/version0/',
  server: {
    watch: {
      interval: 500,
      usePolling: true
    }
  }
});
