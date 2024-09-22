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
type IMapHandlerKey = keyof IMapHandler;

type IMapperParams<T extends IMapHandlerKey> = Parameters<IMapHandler[T]>[0];
type IMapperResult<T extends IMapHandlerKey> = ReturnType<IMapHandler[T]>;

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
export const mapData = <T extends IMapHandlerKey>(
    data: IMapperParams<T>,
    type: T
): IMapperResult<T> => {
    const handler = mapHandler[type];

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return handler(data);
};
