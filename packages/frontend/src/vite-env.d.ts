declare global {
  interface ViteTypeOptions {
    strictImportMetaEnv: unknown
  }

  interface ImportMetaEnv {
    readonly APP_HOST: 'localhost' | '0.0.0.0'
    readonly APP_PORT: number
    readonly API_SERVER: string
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}

export {}
