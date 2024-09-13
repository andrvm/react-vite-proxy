import { defineConfig } from 'vite';
import postcss from './postcss.config.cjs';
import react from '@vitejs/plugin-react';

export default defineConfig({
  define: {
    'process.env': process.env
  },
  css: {
    postcss,
  },
  plugins: [react()],
  assetsInclude: ['**/*.png'],
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  },
  server: {
    proxy: {
      '/users': {
        target: 'http://159.69.178.87/api/v1',
        changeOrigin: true,
        followRedirects: true,
        configure: (proxy, _options) => {
          let cookie = '';
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            if (cookie) {
              // console.log('sent cookie', cookie);
              (proxyReq as any).setHeader('cookie', cookie);
            }
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            const cookies = proxyRes.headers['set-cookie'];
            if (cookies && Array.isArray(cookies)) {
              cookie = cookies[0].split(';').find(c => c.trim().startsWith('__Secure-.MIS.AUTH_TOKEN='));
              // console.log('given cookie', cookie, proxyRes.headers['set-cookie']);
            }
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      }
    },

  }
});
