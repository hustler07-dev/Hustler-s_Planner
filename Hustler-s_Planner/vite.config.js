import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: Hustler-s_Planner, // <-- important for GitHub Pages
  plugins: [react()],
})

