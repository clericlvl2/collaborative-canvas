import axios, {
    type AxiosInstance,
    type AxiosInterceptorManager,
    type AxiosResponse,
    type InternalAxiosRequestConfig,
} from 'axios';

import { BASE_API_URL } from './configs/url';

type IRequestInterceptor = AxiosInterceptorManager<InternalAxiosRequestConfig>;
type IResponseInterceptor = AxiosInterceptorManager<AxiosResponse>;
type IResponseInterceptorParameters = Parameters<IResponseInterceptor['use']>;
type IRequestInterceptorParameters = Parameters<IRequestInterceptor['use']>;

interface IClientOptions {
    baseURL?: string;
}

export type THttpClient = HttpClient;

class HttpClient {
    public post: AxiosInstance['post'];
    public get: AxiosInstance['get'];
    public delete: AxiosInstance['delete'];
    private readonly _instance: AxiosInstance;

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

    setResponseInterceptor(
        onFulfilled: IResponseInterceptorParameters[0],
        onRejected: IResponseInterceptorParameters[1]
    ) {
        this._instance.interceptors.response.use(onFulfilled, onRejected);
    }

    clearResponseInterceptors() {
        this._instance.interceptors.response.clear();
    }
}

export const client = new HttpClient({ baseURL: BASE_API_URL });
