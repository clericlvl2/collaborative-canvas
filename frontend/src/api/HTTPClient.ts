import axios, {
    type AxiosInstance,
    type AxiosInterceptorManager,
    type InternalAxiosRequestConfig,
} from 'axios';

import { BASE_API_URL } from './shared/constants';

export interface IClientOptions {
    baseURL?: string;
}

type IRequestInterceptor = AxiosInterceptorManager<InternalAxiosRequestConfig>;
type IRequestInterceptorParameters = Parameters<IRequestInterceptor['use']>;

export type HTTPClientInstance = typeof client;

class HTTPClient {
    public post: AxiosInstance['post'];
    public get: AxiosInstance['get'];
    public delete: AxiosInstance['delete'];
    private readonly _instance: AxiosInstance = axios.create({
        baseURL: BASE_API_URL,
    });

    constructor({ baseURL }: IClientOptions) {
        this._instance = axios.create({ baseURL });

        this.post = this._instance.post;
        this.get = this._instance.get;
        this.delete = this._instance.delete;
    }

    setRequestInterceptor(
        onFulfilled: IRequestInterceptorParameters[0],
        onRejected: IRequestInterceptorParameters[1]
    ) {
        this._instance.interceptors.request.use(onFulfilled, onRejected);
    }

    clearRequestInterceptors() {
        this._instance.interceptors.request.clear();
    }
}

const client = new HTTPClient({
    baseURL: BASE_API_URL,
});

export default client;
