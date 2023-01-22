/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GITHUB_API_URL: string;
  readonly VITE_GITHUB_PER_PAGE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
