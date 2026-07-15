import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Deanna/',
  server: {
    watch: {
      interval: 500,
      usePolling: true
    }
  }
});
