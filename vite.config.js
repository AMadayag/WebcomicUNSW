import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

import { cloudflare } from "@cloudflare/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  base: process.env.CF_PAGES ? "/" : "/WebcomicUNSW",
  plugins: [react(), babel({ presets: [reactCompilerPreset()] }), cloudflare()],
})
