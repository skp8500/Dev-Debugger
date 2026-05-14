/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly BASE_URL: string;
  readonly VITE_API_PRIMARY?: string;
  readonly VITE_API_PRIMARY_NAME?: string;
  readonly VITE_API_BACKUP?: string;
  readonly VITE_API_BACKUP_NAME?: string;
  readonly VITE_API_TIMEOUT_MS?: string;
  readonly VITE_API_RETRY_COUNT?: string;
  readonly VITE_LOCAL_API_PROXY_TARGET?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
