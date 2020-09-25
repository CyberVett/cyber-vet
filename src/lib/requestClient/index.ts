import axios from 'axios';
import config from 'config';



const requestClient = axios.create({
    baseURL: config.apiRoot,
    headers: {},
    timeout: 10000,
});


//This is used to handle routes that require and do not require accessToken for authentication
requestClient.interceptors.request.use(
    ((requestConfig) => {
        // Get the request route
        // @ts-ignore
        const requestRoute = requestConfig?.url.substr(requestConfig?.baseURL);
        

        // If it's an excluded route, continue as normal by returning the original request config
        const EXCLUDED_ROUTES = [
            'users/login',
        ];
        if (EXCLUDED_ROUTES.includes(requestRoute)) {
            return requestConfig;
        }

        // Else, update the request to get the user token from the localstorage
        const user = localStorage.getItem(config.storageKeys.auth);
        // @ts-ignore
        const accessToken = user.accessToken;
        const requestConfigWithToken = Object.assign({}, requestConfig);
        requestConfigWithToken.headers['Authorization'] = accessToken;

        return requestConfigWithToken;
    }),
    error => Promise.reject(error),
);

export default requestClient;