export interface IHTTPError {
    message: string;
    status: number | undefined;
}

export const instanceOfHTTPError = (object: unknown): object is IHTTPError =>
    typeof object === 'object' &&
    object !== null &&
    'message' in object &&
    'status' in object;
