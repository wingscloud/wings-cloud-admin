import { resolve } from 'path';
import { defineConfig, loadEnv, ConfigEnv } from 'vite';
import { serviceProxy } from './proxy';
import { usePluginOption } from './plugins';

export default ({ command, mode }: ConfigEnv) => {
  const ENV: Record<string, string> = loadEnv(mode, './serve/env/', [
    'VITE_',
    'APP_',
  ]);
  return defineConfig({
    base: ENV.VITE_BASE_URL,
    envDir: './serve/env/',
    envPrefix: 'APP_',
    define: {
      'process.env': ENV,
    },
    resolve: {
      alias: {
        '@': resolve(process.cwd(), 'src'),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
      },
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "src/plugins/element-plus/styles/index.scss" as *;`,
        },
      },
    },
    server: {
      host: ENV.VITE_SERVER_HOST,
      open: ENV.VITE_SERVER_OPEN === 'true',
      port: Number(ENV.VITE_SERVER_PORT),
      https: ENV.VITE_SERVER_HTTPS === 'true',
      proxy: serviceProxy(ENV),
    },
    preview: {
      host: ENV.VITE_SERVER_HOST,
      open: ENV.VITE_SERVER_OPEN === 'true',
      port: Number(ENV.VITE_SERVER_PORT),
      https: ENV.VITE_SERVER_HTTPS === 'true',
      proxy: serviceProxy(ENV),
    },
    build: {
      target: 'modules',
      minify: 'esbuild',
      outDir: ENV.VITE_DIST_PATH,
      chunkSizeWarningLimit: Number(ENV.VITE_BUILD_SIZE_WARNING),
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks(id) {
            if (id.includes('element-plus/theme-chalk/')) {
              return 'element-plus';
            }
          },
        },
      },
    },
    plugins: usePluginOption(ENV),
  });
};