import { IHTTPError } from '../common/errors/HTTPError';
import type { IRootState } from './store';

export interface IThunkApiConfig {
    state: IRootState;
    rejectValue: IHTTPError;
    rejectedMeta: void;
}
