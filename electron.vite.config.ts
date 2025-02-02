import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin, bytecodePlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin(), bytecodePlugin()],
    build: {
      outDir: 'dist/main'
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin(), bytecodePlugin()],
    build: {
      outDir: 'dist/preload'
    }
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [react()],
    build: {
      outDir: 'dist/renderer'
    }
  }
})