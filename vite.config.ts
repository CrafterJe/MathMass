import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

declare const self: any;

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [vue(), tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon-192.png', 'icons/icon-512.png'],
      manifest: {
        name: 'Math Mass',
        short_name: 'MathMass',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0ea5e9',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        runtimeCaching: [
          {
            urlPattern: ({request}) => request.destination === 'document',
            handler: 'NetworkFirst',
            options: { cacheName: 'html' }
          },
          {
            urlPattern: ({request}) => ['style','script','worker'].includes(request.destination),
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'assets' }
          },
          {
            urlPattern: ({url}) => url.origin !== self.location.origin,
            handler: 'CacheFirst',
            options: { cacheName: 'cdn' }
          }
        ]
      }
    })
  ],
})