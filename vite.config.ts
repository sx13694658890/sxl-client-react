import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';
export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      include: ['src/**/*.tsx', 'src/**/*.ts'],
      cache: true,
    }),
  ],
  resolve: {
    alias: {
      '@': 'src',
    },
    extensions: ['.tsx', '.less', '.json', '.ts'],
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {},
        javascriptEnabled: true,
      },
    },
  },
  build: {
    assetsDir: './static',
    chunkSizeWarningLimit: 500,
    minify: 'terser',
    cssCodeSplit: true, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
    terserOptions: {
      compress: {
        // warnings: false,
        drop_console: true, // 打包时删除console
        drop_debugger: true, // 打包时删除 debugger
        pure_funcs: ['console.log'],
      },
      output: {
        // 去掉注释内容
        comments: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // 拆分代码，这个就是分包，配置完后自动按需加载，现在还比不上webpack的splitchunk，不过也能用了。
          echarts: ['echarts'],
          // echarts: ['echarts'],
        },
      },
    },
  },
});
