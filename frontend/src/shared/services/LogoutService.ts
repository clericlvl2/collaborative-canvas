import { ILogoutService } from './ILogoutService';

export class LogoutService implements ILogoutService {
    private _logoutCallbacks: (() => void)[] = [];

    registerLogoutCallback(callback: () => void): void {
        this._logoutCallbacks.push(callback);
    }

    resetLogoutCallback(): void {
        this._logoutCallbacks = [];
    }

    runLogoutCallbacks(): void {
        this._logoutCallbacks.forEach(callback => callback());
    }
}
