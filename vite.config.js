import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss({
      config: {
        content: [
          "./index.html",
          "./src/**/*.{js,ts,jsx,tsx}",
        ],
        theme: {
          extend: {
            fontFamily: {
              display: ['Inter', 'sans-serif'],
            },
            colors: {
              'primary': '#7f5af0',
              'bg-glass': 'rgba(255, 255, 255, 0.1)',
            },
            backdropBlur: {
              xs: '2px',
            }
          },
        },
        plugins: [],
      },
    }),
  ],
  // base: process.env.VITE_BASE_PATH || '/MetricLab',
})