export interface IRegisterParams {
    name: string;
    email: string;
    password: string;
}

export interface ILoginParams {
    email: string;
    password: string;
}

export interface IUserResponseData {
    _id: string;
    name: string;
    email: string;
}

export interface IUser extends Omit<IUserResponseData, '_id'> {
    id: string;
}

export interface IUserAuthenticationData {
    user: IUser;
    token: string;
}

export interface ILoginResponse {
    user: IUserResponseData;
    token: string;
}

export interface ICreateRoomParams {
    name: string;
}

export interface IRoomResponseData {
    _id: string;
    name: string;
    owner: string;
    participants: string[];
    createdAt: string;
    updatedAt: string;
}

export type IRoomsResponseData = IRoomResponseData[];

export interface IRoom extends Omit<IRoomResponseData, '_id'> {
    id: string;
}

export type IRooms = IRoom[];
