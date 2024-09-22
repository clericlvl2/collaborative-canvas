/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

interface ImportMetaEnv {
    readonly VITE_REACT_APP_API_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
