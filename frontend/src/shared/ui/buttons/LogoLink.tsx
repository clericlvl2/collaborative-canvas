import { Logo, NavigationLink } from '@shared/ui';

export function LogoLink({ to }: { to: string }) {
    return (
        <NavigationLink
            to={to}
            color="#fff"
            underline="none"
            sx={{
                display: 'flex',
                gap: 1,
            }}
        >
            <Logo />
        </NavigationLink>
    );
}
