import { fileURLToPath, URL } from 'node:url'
import federation from "@originjs/vite-plugin-federation";
import { createHtmlPlugin } from 'vite-plugin-html'
// import { defineConfig } from 'vite';
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue';
import copy from "rollup-plugin-copy";


export default defineConfig({
  test:{globals:true},
  plugins: [vue(),
    federation({
      name: 'shell',
      filename: 'remoteEntry.js',
      exposes:{},
      remotes:{
          'remote': 'http://127.0.0.1:4173/assets/remoteEntry.js'
      },
      shared:[],
    }),
    createHtmlPlugin({
      inject:{
        data:{
          title:'shell',
        }
      }
    }),
    copy({
      targets:[{
        src:"dist/assets",
        dest:'public'
      },
    ],
    hook:'writeBundle'
    })
  ],
resolve: {
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url)),
    vue: "vue/dist/vue.esm-bundler.js",
    "vue-router": "vue-router/dist/vue-router.esm-bundler.js",
  },
},
build: {
  target: "esnext",
  minify: false,
  cssCodeSplit: true,
  rollupOptions: {
    output: {
      minifyInternalExports: false,

    },
  },
},
})
