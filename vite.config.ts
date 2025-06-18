import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Carrega variáveis de ambiente com base no modo
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    define: {
      // Garante que o Vite reconheça as variáveis como import.meta.env
      'import.meta.env': {
        ...env,
      },
    },
  };
});
