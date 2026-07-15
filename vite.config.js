import { defineConfig } from 'vite';

export default defineConfig({
  base: '/D1/',
  server: {
    watch: {
      interval: 500,
      usePolling: true
    }
  }
});
