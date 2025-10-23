export { USER_INPUTS_CONFIGS } from './config/input';

export { loginUser, logoutUser, registerUser } from './model/actions';
export { addAuthListeners } from './model/middleware';
export { USER_SCHEMAS } from './model/schema';
export { useUser } from './model/useUser';
export {
    selectAuthError,
    selectAuthStatus,
    selectToken,
    selectUser,
    USER_SLICE_NAME,
    userDataCleared,
    userReducer,
} from './model/store';

export { UserIconLink } from './ui/UserIconLink';

export { userApi } from './api/userApi';
export type {
    ILoginParams,
    ILoginResponse,
    IRegisterParams,
    IUser,
} from './api/types';
