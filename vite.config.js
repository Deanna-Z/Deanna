import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Deanna_Portfolio_Website/',
  server: {
    watch: {
      interval: 500,
      usePolling: true
    }
  }
});
