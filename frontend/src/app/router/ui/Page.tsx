import { Outlet } from 'react-router';

import { UserIconLink } from '@entities/user';
import { useUser } from '@entities/user/model/useUser';
import { HOME_ROUTE, ROUTE } from '@shared/config';
import { HeaderLayout, LogoLink, MainLayout, PageLayout } from '@shared/ui';

export function Page() {
    const { isLogged } = useUser();

    return (
        <PageLayout>
            <HeaderLayout>
                <LogoLink to={HOME_ROUTE} />
                {isLogged && <UserIconLink to={ROUTE.PROFILE} />}
            </HeaderLayout>
            <MainLayout>
                <Outlet />
            </MainLayout>
        </PageLayout>
    );
}
