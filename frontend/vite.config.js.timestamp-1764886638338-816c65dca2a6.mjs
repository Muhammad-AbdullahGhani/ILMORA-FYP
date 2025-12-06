// vite.config.js
import { defineConfig } from "file:///C:/Users/User/Desktop/FYP-ILM-ORA/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/User/Desktop/FYP-ILM-ORA/frontend/node_modules/@vitejs/plugin-react/dist/index.js";
import tailwindcss from "file:///C:/Users/User/Desktop/FYP-ILM-ORA/frontend/node_modules/@tailwindcss/vite/dist/index.mjs";
import path from "path";
import { fileURLToPath } from "url";
var __vite_injected_original_import_meta_url = "file:///C:/Users/User/Desktop/FYP-ILM-ORA/frontend/vite.config.js";
var __dirname = path.dirname(fileURLToPath(__vite_injected_original_import_meta_url));
function stripVersionPlugin() {
  return {
    name: "strip-version-imports",
    enforce: "pre",
    async resolveId(source, importer) {
      if (!source || typeof source !== "string") return null;
      let normalized = source.replace(/^(@radix-ui\/react-[a-z0-9-]+)@[0-9.]+$/, "$1").replace(/^lucide-react@[0-9.]+$/, "lucide-react").replace(/^class-variance-authority@[0-9.]+$/, "class-variance-authority").replace(/^motion\/react$/, "framer-motion").replace(/^motion@[0-9.]+$/, "motion").replace(/^recharts@[0-9.]+$/, "recharts");
      if (normalized !== source) {
        const resolved = await this.resolve(normalized, importer, {
          skipSelf: true
        });
        return resolved ? resolved.id : normalized;
      }
      return null;
    }
  };
}
var vite_config_default = defineConfig({
  plugins: [stripVersionPlugin(), react(), tailwindcss()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "./src")
      },
      {
        find: "@app",
        replacement: path.resolve(__dirname, "./src/app")
      },
      {
        find: "@presentation",
        replacement: path.resolve(__dirname, "./src/presentation")
      },
      {
        find: "@application",
        replacement: path.resolve(__dirname, "./src/application")
      },
      {
        find: "@domain",
        replacement: path.resolve(__dirname, "./src/domain")
      },
      {
        find: "@infrastructure",
        replacement: path.resolve(__dirname, "./src/infrastructure")
      },
      // Normalize imports that mistakenly include an inline version suffix like
      // "@radix-ui/react-tabs@1.1.3" -> "@radix-ui/react-tabs"
      {
        find: /^@radix-ui\/react-([a-z0-9-]+)@[0-9.]+/,
        replacement: "@radix-ui/react-$1"
      },
      // lucide-react@0.487.0 -> lucide-react
      {
        find: /^lucide-react@[0-9.]+/,
        replacement: "lucide-react"
      },
      // class-variance-authority@0.7.1 -> class-variance-authority
      {
        find: /^class-variance-authority@[0-9.]+/,
        replacement: "class-variance-authority"
      },
      // motion@... -> motion (covers some mistaken specifiers)
      {
        find: /^motion@[0-9.]+/,
        replacement: "motion"
      },
      // recharts@... -> recharts
      {
        find: /^recharts@[0-9.]+/,
        replacement: "recharts"
      }
    ]
  },
  server: {
    port: 3001,
    open: true,
    proxy: {
      // Route all API requests through the gateway
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxVc2VyXFxcXERlc2t0b3BcXFxcRllQLUlMTS1PUkFcXFxcZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFVzZXJcXFxcRGVza3RvcFxcXFxGWVAtSUxNLU9SQVxcXFxmcm9udGVuZFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvVXNlci9EZXNrdG9wL0ZZUC1JTE0tT1JBL2Zyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7Ly8gZnJvbnRlbmQvdml0ZS5jb25maWcuanNcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCB0YWlsd2luZGNzcyBmcm9tICdAdGFpbHdpbmRjc3Mvdml0ZSc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSAndXJsJztcclxuY29uc3QgX19kaXJuYW1lID0gcGF0aC5kaXJuYW1lKGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKSk7XHJcbmZ1bmN0aW9uIHN0cmlwVmVyc2lvblBsdWdpbigpIHtcclxuICByZXR1cm4ge1xyXG4gICAgbmFtZTogJ3N0cmlwLXZlcnNpb24taW1wb3J0cycsXHJcbiAgICBlbmZvcmNlOiAncHJlJyxcclxuICAgIGFzeW5jIHJlc29sdmVJZChzb3VyY2UsIGltcG9ydGVyKSB7XHJcbiAgICAgIGlmICghc291cmNlIHx8IHR5cGVvZiBzb3VyY2UgIT09ICdzdHJpbmcnKSByZXR1cm4gbnVsbDtcclxuICAgICAgLy8gTm9ybWFsaXplIHNwZWNpZmljIGNvbW1vbiBiYWQgc3BlY2lmaWVycyB0byB0aGVpciBjYW5vbmljYWwgcGFja2FnZSBuYW1lc1xyXG4gICAgICBsZXQgbm9ybWFsaXplZCA9IHNvdXJjZS5yZXBsYWNlKC9eKEByYWRpeC11aVxcL3JlYWN0LVthLXowLTktXSspQFswLTkuXSskLywgJyQxJykucmVwbGFjZSgvXmx1Y2lkZS1yZWFjdEBbMC05Ll0rJC8sICdsdWNpZGUtcmVhY3QnKS5yZXBsYWNlKC9eY2xhc3MtdmFyaWFuY2UtYXV0aG9yaXR5QFswLTkuXSskLywgJ2NsYXNzLXZhcmlhbmNlLWF1dGhvcml0eScpLnJlcGxhY2UoL15tb3Rpb25cXC9yZWFjdCQvLCAnZnJhbWVyLW1vdGlvbicpLnJlcGxhY2UoL15tb3Rpb25AWzAtOS5dKyQvLCAnbW90aW9uJykucmVwbGFjZSgvXnJlY2hhcnRzQFswLTkuXSskLywgJ3JlY2hhcnRzJyk7XHJcbiAgICAgIGlmIChub3JtYWxpemVkICE9PSBzb3VyY2UpIHtcclxuICAgICAgICAvLyBMZXQgVml0ZSByZXNvbHZlIHRoZSBub3JtYWxpemVkIGlkOyBpZiBpdCByZXNvbHZlcywgcmV0dXJuIGl0IHNvIGJ1bmRsZXIgdXNlcyBpdFxyXG4gICAgICAgIGNvbnN0IHJlc29sdmVkID0gYXdhaXQgdGhpcy5yZXNvbHZlKG5vcm1hbGl6ZWQsIGltcG9ydGVyLCB7XHJcbiAgICAgICAgICBza2lwU2VsZjogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiByZXNvbHZlZCA/IHJlc29sdmVkLmlkIDogbm9ybWFsaXplZDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9O1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW3N0cmlwVmVyc2lvblBsdWdpbigpLCByZWFjdCgpLCB0YWlsd2luZGNzcygpXSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczogW3tcclxuICAgICAgZmluZDogJ0AnLFxyXG4gICAgICByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJylcclxuICAgIH0sIHtcclxuICAgICAgZmluZDogJ0BhcHAnLFxyXG4gICAgICByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2FwcCcpXHJcbiAgICB9LCB7XHJcbiAgICAgIGZpbmQ6ICdAcHJlc2VudGF0aW9uJyxcclxuICAgICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9wcmVzZW50YXRpb24nKVxyXG4gICAgfSwge1xyXG4gICAgICBmaW5kOiAnQGFwcGxpY2F0aW9uJyxcclxuICAgICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9hcHBsaWNhdGlvbicpXHJcbiAgICB9LCB7XHJcbiAgICAgIGZpbmQ6ICdAZG9tYWluJyxcclxuICAgICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9kb21haW4nKVxyXG4gICAgfSwge1xyXG4gICAgICBmaW5kOiAnQGluZnJhc3RydWN0dXJlJyxcclxuICAgICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9pbmZyYXN0cnVjdHVyZScpXHJcbiAgICB9LFxyXG4gICAgLy8gTm9ybWFsaXplIGltcG9ydHMgdGhhdCBtaXN0YWtlbmx5IGluY2x1ZGUgYW4gaW5saW5lIHZlcnNpb24gc3VmZml4IGxpa2VcclxuICAgIC8vIFwiQHJhZGl4LXVpL3JlYWN0LXRhYnNAMS4xLjNcIiAtPiBcIkByYWRpeC11aS9yZWFjdC10YWJzXCJcclxuICAgIHtcclxuICAgICAgZmluZDogL15AcmFkaXgtdWlcXC9yZWFjdC0oW2EtejAtOS1dKylAWzAtOS5dKy8sXHJcbiAgICAgIHJlcGxhY2VtZW50OiAnQHJhZGl4LXVpL3JlYWN0LSQxJ1xyXG4gICAgfSxcclxuICAgIC8vIGx1Y2lkZS1yZWFjdEAwLjQ4Ny4wIC0+IGx1Y2lkZS1yZWFjdFxyXG4gICAge1xyXG4gICAgICBmaW5kOiAvXmx1Y2lkZS1yZWFjdEBbMC05Ll0rLyxcclxuICAgICAgcmVwbGFjZW1lbnQ6ICdsdWNpZGUtcmVhY3QnXHJcbiAgICB9LFxyXG4gICAgLy8gY2xhc3MtdmFyaWFuY2UtYXV0aG9yaXR5QDAuNy4xIC0+IGNsYXNzLXZhcmlhbmNlLWF1dGhvcml0eVxyXG4gICAge1xyXG4gICAgICBmaW5kOiAvXmNsYXNzLXZhcmlhbmNlLWF1dGhvcml0eUBbMC05Ll0rLyxcclxuICAgICAgcmVwbGFjZW1lbnQ6ICdjbGFzcy12YXJpYW5jZS1hdXRob3JpdHknXHJcbiAgICB9LFxyXG4gICAgLy8gbW90aW9uQC4uLiAtPiBtb3Rpb24gKGNvdmVycyBzb21lIG1pc3Rha2VuIHNwZWNpZmllcnMpXHJcbiAgICB7XHJcbiAgICAgIGZpbmQ6IC9ebW90aW9uQFswLTkuXSsvLFxyXG4gICAgICByZXBsYWNlbWVudDogJ21vdGlvbidcclxuICAgIH0sXHJcbiAgICAvLyByZWNoYXJ0c0AuLi4gLT4gcmVjaGFydHNcclxuICAgIHtcclxuICAgICAgZmluZDogL15yZWNoYXJ0c0BbMC05Ll0rLyxcclxuICAgICAgcmVwbGFjZW1lbnQ6ICdyZWNoYXJ0cydcclxuICAgIH1dXHJcbiAgfSxcclxuICBzZXJ2ZXI6IHtcclxuICAgIHBvcnQ6IDMwMDEsXHJcbiAgICBvcGVuOiB0cnVlLFxyXG4gICAgcHJveHk6IHtcclxuICAgICAgLy8gUm91dGUgYWxsIEFQSSByZXF1ZXN0cyB0aHJvdWdoIHRoZSBnYXRld2F5XHJcbiAgICAgICcvYXBpJzoge1xyXG4gICAgICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcsXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgIHNlY3VyZTogZmFsc2VcclxuICAgICAgfVxyXG4g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
