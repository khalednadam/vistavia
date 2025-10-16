import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'Vistavia',
      fileName: 'vistavia',
      formats: ['es', 'umd'],
    },
  },
  root: 'playground',
  server: {
    open: true,
  },
})