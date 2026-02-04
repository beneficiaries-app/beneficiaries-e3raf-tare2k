/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
  // Add more environment variables here as needed
  // readonly VITE_YOUR_VARIABLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
