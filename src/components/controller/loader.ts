import { ApiResponse, RequestParams } from '../../types/api';

type Callback<T = ApiResponse> = (data: T) => void;

class Loader {
    protected baseLink: string;
    protected options: Record<string, string | number | boolean>;

    constructor(baseLink: string, options: Record<string, string | number | boolean>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<T = ApiResponse>(
        { endpoint, options = {} }: RequestParams,
        callback: Callback<T> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404) {
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }
            throw new Error(res.statusText);
        }
        return res;
    }

    private makeUrl(options: Record<string, string | number | boolean>, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    protected load<T>(
        method: string,
        endpoint: string,
        callback: Callback<T>,
        options: Record<string, string | number | boolean> = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json() as Promise<T>)
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;