// frontend/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
function stripVersionPlugin() {
  return {
    name: 'strip-version-imports',
    enforce: 'pre',
    async resolveId(source, importer) {
      if (!source || typeof source !== 'string') return null;
      // Normalize specific common bad specifiers to their canonical package names
      let normalized = source.replace(/^(@radix-ui\/react-[a-z0-9-]+)@[0-9.]+$/, '$1').replace(/^lucide-react@[0-9.]+$/, 'lucide-react').replace(/^class-variance-authority@[0-9.]+$/, 'class-variance-authority').replace(/^motion\/react$/, 'framer-motion').replace(/^motion@[0-9.]+$/, 'motion').replace(/^recharts@[0-9.]+$/, 'recharts');
      if (normalized !== source) {
        // Let Vite resolve the normalized id; if it resolves, return it so bundler uses it
        const resolved = await this.resolve(normalized, importer, {
          skipSelf: true
        });
        return resolved ? resolved.id : normalized;
      }
      return null;
    }
  };
}
export default defineConfig({
  plugins: [stripVersionPlugin(), react(), tailwindcss()],
  resolve: {
    alias: [{
      find: '@',
      replacement: path.resolve(__dirname, './src')
    }, {
      find: '@app',
      replacement: path.resolve(__dirname, './src/app')
    }, {
      find: '@presentation',
      replacement: path.resolve(__dirname, './src/presentation')
    }, {
      find: '@application',
      replacement: path.resolve(__dirname, './src/application')
    }, {
      find: '@domain',
      replacement: path.resolve(__dirname, './src/domain')
    }, {
      find: '@infrastructure',
      replacement: path.resolve(__dirname, './src/infrastructure')
    },
    // Normalize imports that mistakenly include an inline version suffix like
    // "@radix-ui/react-tabs@1.1.3" -> "@radix-ui/react-tabs"
    {
      find: /^@radix-ui\/react-([a-z0-9-]+)@[0-9.]+/,
      replacement: '@radix-ui/react-$1'
    },
    // lucide-react@0.487.0 -> lucide-react
    {
      find: /^lucide-react@[0-9.]+/,
      replacement: 'lucide-react'
    },
    // class-variance-authority@0.7.1 -> class-variance-authority
    {
      find: /^class-variance-authority@[0-9.]+/,
      replacement: 'class-variance-authority'
    },
    // motion@... -> motion (covers some mistaken specifiers)
    {
      find: /^motion@[0-9.]+/,
      replacement: 'motion'
    },
    // recharts@... -> recharts
    {
      find: /^recharts@[0-9.]+/,
      replacement: 'recharts'
    }]
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, '/api')
      }
    }
  }
});