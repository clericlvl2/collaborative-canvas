import type { IUserDTO } from './dto';

export interface IUser extends Omit<IUserDTO, '_id'> {
    id: string;
}

export interface IRegisterParams {
    name: string;
    email: string;
    password: string;
}

export interface ILoginParams {
    email: string;
    password: string;
}

export interface ILoginResponse {
    user: IUser;
    token: string;
}
