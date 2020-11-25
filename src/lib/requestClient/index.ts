import axios from 'axios';
import config from 'config';



const requestClient = axios.create({
    baseURL: config.apiRoot,
    headers: {},
    timeout: 30000,
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
            'users/reset-password',
            'users/update-password',
        ];
        if (EXCLUDED_ROUTES.includes(requestRoute)) {
            return requestConfig;
        }

        // Else, update the request to get the user token from the localstorage
        // @ts-ignore
        const user = JSON.parse(localStorage?.getItem(config.storageKeys.auth));
        // @ts-ignore
        const accessToken = `Bearer ${user.accessToken}`;
        const requestConfigWithToken = Object.assign({}, requestConfig);
        requestConfigWithToken.headers['Authorization'] = accessToken;

        return requestConfigWithToken;
    }),
    error => Promise.reject(error),
);

export default requestClient;