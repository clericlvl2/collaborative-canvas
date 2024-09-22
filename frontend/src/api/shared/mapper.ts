import type {
    IRoom,
    IRoomResponseData,
    IRoomsResponseData,
    IUser,
    IUserResponseData,
} from './types';

export enum Mapper {
    User,
    Room,
    Rooms,
}

type IMapHandler = typeof mapHandler;

export const userMapper = ({ _id, ...user }: IUserResponseData): IUser => ({
    ...user,
    id: _id,
});

export const roomMapper = ({ _id, ...room }: IRoomResponseData): IRoom => ({
    ...room,
    id: _id,
});

export const roomsMapper = (rooms: IRoomsResponseData): IRoom[] =>
    rooms.map(roomMapper);

export const mapHandler = {
    [Mapper.User]: userMapper,
    [Mapper.Room]: roomMapper,
    [Mapper.Rooms]: roomsMapper,
} as const;

// FIXME type error
export const mapData = <T extends Mapper>(
    data: Parameters<IMapHandler[T]>[0],
    type: T
): ReturnType<IMapHandler[T]> => mapHandler[type](data);
