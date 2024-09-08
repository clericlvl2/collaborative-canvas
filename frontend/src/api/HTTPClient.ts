import axios from 'axios';

import { LocalStorageKey } from '../common/enums';
import { BASE_API_URL } from './shared/constants';

class HTTPClient {
    private static readonly _instance = axios.create({ baseURL: BASE_API_URL });

    static getInstance() {
        return this._instance;
    }

    static setHeadersField(field: string, value: string): void {
        this._instance.defaults.headers.common[field] = value;
    }

    static removeHeadersField(field: string): void {
        this._instance.defaults.headers.common[field] = undefined;
    }
}

(function () {
    const token = localStorage.getItem(LocalStorageKey.AuthToken);

    if (token) {
        HTTPClient.setHeadersField('Authorization', `Bearer ${token}`);
    }
})();

export default HTTPClient;
