const DEV_API_URL = 'http://localhost:4488/api/';
const DEV_SOCKET_URL = 'http://localhost:3366';

export const BASE_API_URL = import.meta.env.VITE_REACT_APP_API_URL
    || DEV_API_URL;
export const BASE_SOCKET_URL = import.meta.env.VITE_REACT_APP_SOCKET_URL
    || DEV_SOCKET_URL;
