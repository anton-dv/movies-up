/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly API_REQUEST_DELAY: number;
  readonly API_BASE_URL: string;
  readonly API_DISCOVER: string;
  readonly API_SEARCH: string;
  readonly API_ITEMS_PER_PAGE: number;
  readonly API_GENRES_LIST: string;
  readonly API_MAX_PAGES: number;
  readonly API_TOKEN: string;
  readonly API_ACCOUNT_ID: string;
  readonly API_GUEST_SESSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
