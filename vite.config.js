import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  base: "/WebcomicUNSW",
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})

// to deploy: npm run build && npx gh-pages -d dist