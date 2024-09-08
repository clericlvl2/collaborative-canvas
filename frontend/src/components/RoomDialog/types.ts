import type {
    ICreateRoomParams,
    IRoomResponseData,
} from '../../api/shared/types';
import type { IResult } from '../../hooks/types';

export type IDialogResult = IResult<IRoomResponseData>;

export interface IRoomDialogProps {
    onSubmit: (params: ICreateRoomParams) => Promise<IDialogResult>;
}
