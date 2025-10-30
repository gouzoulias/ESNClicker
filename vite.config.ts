import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/Components'),
      '@game': path.resolve(__dirname, './src/Game'),
      '@utils': path.resolve(__dirname, './src/Utils'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
});
