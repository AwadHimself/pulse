import { fileURLToPath, URL } from 'node:url'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'




// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VueRouter(),
    vue({
      template:{
        compilerOptions:{
          isCustomElement : ele=> ele.startsWith('iconify-icon')
        }
      }
    }),
    vueDevTools(),
    tailwindcss(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.vue\.[tj]sx?\?vue/, // .vue (vue-loader with experimentalInlineMatchResource enabled)
        /\.md$/, // .md
      ],
      imports: [
        // presets
        'vue',
        'vue-router',
        // custom
        ],
        dts: true,
        viteOptimizeDeps: true,
     }),
     Components({ /* options */ }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
