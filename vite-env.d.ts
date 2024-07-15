/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REACT_APP_SERVER_URL: string;
  // add more environment variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

