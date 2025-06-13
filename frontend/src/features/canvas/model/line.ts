import Konva from 'konva';

export interface ILineData extends Pick<Konva.LineConfig,
    | 'lineJoin'
    | 'lineCap'
    | 'globalCompositeOperation'
    | 'stroke'> {
    points: number[];
    strokeWidth: number;
    tension: number;
}
