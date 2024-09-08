export interface ISignUpParams {
    name: string;
    email: string;
    password: string;
}

export interface ISignInParams {
    email: string;
    password: string;
}

export interface IUserResponseData {
    _id: string;
    name: string;
    email: string;
}

export interface IUserResponse {
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
