type IPagesRecord = typeof Pages;
type IPageKey = keyof IPagesRecord;
type IPage = IPagesRecord[IPageKey];
type IRoutesRecord = {
    [Key in IPageKey]: `/${IPage}`;
};
type IRoute = IRoutesRecord[keyof IRoutesRecord];

export const getPath = (route: IPage): IRoute => `/${route}`;

export const Pages = {
    Rooms: 'rooms',
    Board: 'board',
    Profile: 'profile',
    SignIn: 'sign-in',
    SignUp: 'sign-up',
} as const;

const initRoutes = (): IRoutesRecord =>
    Object.entries(Pages).reduce<Partial<IRoutesRecord>>(
        (routes, [key, page]) => {
            routes[key as IPageKey] = getPath(page);

            return routes;
        },
        {}
    ) as IRoutesRecord;

export const PagesRoutes = initRoutes();
