// Why @app dependency? It's a weak 'type-only' dep, it allows redux async thunks to be typed
import type { TRootState } from '@app/store';

import { IHTTPError } from '@shared/lib';

export interface IThunkApiConfig {
    state: TRootState;
    rejectValue: IHTTPError;
}
