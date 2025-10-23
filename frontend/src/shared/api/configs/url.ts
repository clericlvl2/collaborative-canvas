const Config = {
    DevBaseUrl: 'http://localhost',
    Port: {
        DevApi: 5000,
        DevSocket: 4000,
    },
};

export const BASE_API_URL = import.meta.env.VITE_APP_API_URL
    || `${Config.DevBaseUrl}:${Config.Port.DevApi}/api/`;
export const BASE_SOCKET_URL = import.meta.env.VITE_APP_SOCKET_URL
    || `${Config.DevBaseUrl}:${Config.Port.DevSocket}`;
