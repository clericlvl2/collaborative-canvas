import type { IUserDTO } from './dto';
import type { IUser } from './types';

export const userMapper = ({ _id, ...user }: IUserDTO): IUser => ({
    ...user,
    id: _id,
});
