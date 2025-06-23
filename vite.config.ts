import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { fileURLToPath } from 'url';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [vue()],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: path.resolve(fileURLToPath(new URL('./src', import.meta.url)))
        },
        // Adicione outros aliases conforme necessário
        {
          find: '@components',
          replacement: path.resolve(fileURLToPath(new URL('./src/components', import.meta.url)))
        },
        {
          find: '@libs',
          replacement: path.resolve(fileURLToPath(new URL('./src/libs', import.meta.url)))
        }
      ]
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