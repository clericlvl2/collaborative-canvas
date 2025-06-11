const DEV_API_PORT = 5000;
const DEV_SOCKET_PORT = 3000;

export const BASE_API_URL = import.meta.env.VITE_REACT_APP_API_URL
    || `http://localhost:${DEV_API_PORT}/api/`;
export const BASE_SOCKET_URL = import.meta.env.VITE_REACT_APP_SOCKET_URL
    || `http://localhost:${DEV_SOCKET_PORT}`;
