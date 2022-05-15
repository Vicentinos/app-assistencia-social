interface ImportMetaEnv {
  readonly VITE_ENV: "local" | "development" | "production";
  readonly VITE_APP_CHECK_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
