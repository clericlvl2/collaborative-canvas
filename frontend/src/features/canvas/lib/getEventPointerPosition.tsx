import Konva from 'konva';

import { IPosition } from '../model/dimensions';

type TKonvaEvent = Konva.KonvaEventObject<MouseEvent | TouchEvent>;

export const getEventPointerPosition = (
    event: TKonvaEvent
): IPosition | null => {
    return event.target.getStage()?.getPointerPosition() ?? null;
};
