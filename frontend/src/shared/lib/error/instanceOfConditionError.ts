export interface IConditionError {
    message: string;
    name: string;
}

export const instanceOfConditionError = (
    object: unknown
): object is IConditionError =>
    typeof object === 'object'
    && object !== null
    && 'message' in object
    && 'name' in object
    && object.name === 'ConditionError';
