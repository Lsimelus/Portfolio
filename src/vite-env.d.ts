/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the contact-form API (lyndbergh-platform); set in Vercel and in .env. */
  readonly REACT_APP_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
