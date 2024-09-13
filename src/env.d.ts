// src/env.d.ts
interface ImportMetaEnv {
    VITE_API_URL: string;
    // Add other environment variables here if needed
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
