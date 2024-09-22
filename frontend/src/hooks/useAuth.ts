import { useMemo } from 'react';

import { isExist } from '../common/utils';
import { selectToken, selectUser } from '../store/auth/auth';
import { useAppSelector } from '../store/hooks';

export const useAuth = () => {
    const user = useAppSelector(selectUser);
    const token = useAppSelector(selectToken);

    const isLogged = useMemo(
        () => isExist(user) && isExist(token),
        [user, token]
    );

    return { isLogged, user, token };
};
