import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx', // Configuração correta do loader
    include: /\.jsx?$/, // Para garantir que o JSX seja usado em arquivos .js e .jsx
  },
});
