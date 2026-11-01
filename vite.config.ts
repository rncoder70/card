import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// Let VS Code's port forwarding (dev tunnels) reach the local server, so the site can be shared by link.
const allowedHosts = ['.devtunnels.ms']

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5173, allowedHosts },
  preview: { port: 4173, allowedHosts },
})
