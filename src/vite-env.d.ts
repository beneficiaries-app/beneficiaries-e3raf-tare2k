/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
  readonly VITE_REGISTER_HEADER_TITLE: string
  readonly VITE_REGISTER_CLOSED_MSG: string
  readonly VITE_REGISTER_PENDING_MSG: string
  readonly VITE_GOOGLE_SHEETS_SCRIPT_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
