// env.d.ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      JWT_SECRET: string;
      API_PORT: string;
      SOCKET_PORT: string;
      DB_URI: string;
    }
  }
}

export {};