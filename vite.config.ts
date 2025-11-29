/*
 * @Author: serendipity 2843306836@qq.com
 * @Date: 2025-11-26 20:43:11
 * @LastEditors: serendipity 2843306836@qq.com
 * @LastEditTime: 2025-11-26 21:17:07
 * @FilePath: \mini-ad-wall-web\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  base: '/mini-ad-wall/',//服务器路径
  plugins: [
    tailwindcss(),
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  build: {
    // 优化打包体积：拆分 chunks，减小单个文件大小
    chunkSizeWarningLimit: 1500, // 超过 1500KB 才报警告（默认 500KB）
    rollupOptions: {
      output: {
        // 按模块拆分 chunks（便于缓存）
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
