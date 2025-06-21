import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Carrega variáveis de ambiente
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      port: 5173,
      proxy: {
        // Configura proxy para evitar problemas de CORS em desenvolvimento
        '/api': {
          target: env.VITE_API_BASE_URL || 'https://localhost:44356',
          changeOrigin: true,
          secure: false, // Ignora certificado SSL em desenvolvimento
          rewrite: (path) => path.replace(/^\/api/, '/api/v1')
        }
      }
    },
    define: {
      'process.env': {},
      'import.meta.env': JSON.stringify(env)
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: mode !== 'production'
    }
  };
});