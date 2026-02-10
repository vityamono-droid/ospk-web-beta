import { defineConfig, loadEnv, type UserConfig } from 'vite'
import commonjs from 'vite-plugin-commonjs'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'
import fs from 'fs'

const resolvePaths = (ignoreList?: string[]) => {
  const entries = fs
    .readdirSync('./src')
    .filter((item) => fs.statSync(path.join(__dirname, `/src/${item}`)).isDirectory() && !ignoreList?.includes(item))
    .map((item) => {
      console.log('Resolved path: [%s] %s', `@${item}`, `./src/${item}`)

      return [`@${item}`, path.join(__dirname, `/src/${item}`)]
    })

  return Object.fromEntries(entries)
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, ['APP_', 'API_'])

  if (env.APP_HOST || env.APP_PORT) {
    const params = [env.APP_HOST, env.APP_PORT].filter((item) => item)
    console.log('App will be hosted at: %s in %s mode', params.join(':'), mode)
  }

  return {
    plugins: [react(), svgr(), commonjs()],
    resolve: {
      alias: resolvePaths([]),
    },
    server: {
      host: env.APP_HOST,
      port: +env.APP_PORT,
      strictPort: true,
      proxy: {
        '/api': {
          target: env.API_SERVER,
        },
        '/static': {
          target: env.API_SERVER,
        },
      },
    },
    build: {
      outDir: 'dest',
      emptyOutDir: true,
      target: 'baseline-widely-available',
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              return id.split('node_modules/')[1].split('/')[0]
            }
          },
        },
      },
    },
  } satisfies UserConfig
})
