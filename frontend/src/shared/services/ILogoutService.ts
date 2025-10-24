export interface ILogoutService {
    registerLogoutCallback: (callback: () => void) => void;
    resetLogoutCallback: () => void;
    runLogoutCallbacks: () => void;
}
