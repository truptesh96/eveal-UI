import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  build: {
    cacheDir: '.vite',
    sourcemap: true,
  },
  css: {
    devSourcemap: true,
  },
  server: {
    port: 3030
  },
  preview: {
    port: 8080
  },
  plugins: [
    createHtmlPlugin({
      // entry: './src/main.js',

      inject: {
        data: {
          templateStart: `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Cabot – UI</title>
              <link rel="preconnect" href="https://use.typekit.net" crossorigin>
              <link href="https://use.typekit.net/ctb1jej.css" rel="stylesheet">
            </head>
            <body>`,
          templateEnd: `</body>
            </html>`,
        },
      },
    }),
  ],
})