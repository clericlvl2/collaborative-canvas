type IPagesRecord = typeof PAGE;
type IPageKey = keyof IPagesRecord;
type IPage = IPagesRecord[IPageKey];
type IRoutesRecord = {
    [Key in IPageKey]: `/${IPagesRecord[Key]}`;
};
type IRoute = IRoutesRecord[keyof IRoutesRecord];

export const getPath = (route: IPage): IRoute => `/${route}`;

export const PAGE = {
    ROOMS: 'rooms',
    BOARD: 'board',
    PROFILE: 'profile',
    LOGIN: 'sign-in',
    REGISTER: 'sign-up',
} as const;

const initRouteObject = (): IRoutesRecord =>
    Object.entries(PAGE).reduce<Partial<IRoutesRecord>>(
        (routes, [key, page]) => {
            Object.assign(routes, { [key as IPageKey]: getPath(page) });

            return routes;
        },
        {}
    ) as IRoutesRecord;

export const ROUTE: Readonly<IRoutesRecord> = initRouteObject();
export const HOME_ROUTE = ROUTE.ROOMS;
