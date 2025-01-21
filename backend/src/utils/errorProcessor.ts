export const logError = (error: unknown, message?: string): void => {
    if (error instanceof Error) {
        console.error(message + error.message);
    }
    else {
        console.error("Unknown error occured");
    }
};