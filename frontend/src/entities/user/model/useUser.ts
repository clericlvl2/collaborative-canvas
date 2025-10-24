import { useMemo } from 'react';

import { isExist } from '@shared/lib';
import { useAppSelector } from '@shared/store';

import { selectToken, selectUser } from './store';

export const useUser = () => {
    const user = useAppSelector(selectUser);
    const token = useAppSelector(selectToken);

    return useMemo(
        () => ({
            isLogged: isExist(user) && isExist(token),
            user,
            token,
        }),
        [user, token]
    );
};
