export const validateEnv = () => {
    if (import.meta.env.PROD) {
        if (!import.meta.env.VITE_API_URL) {
            console.warn('VITE_API_URL is not set in production');
        }

        if (!import.meta.env.VITE_SOCKET_URL) {
            console.warn('VITE_SOCKET_URL is not set in production');
        }
    }
};
