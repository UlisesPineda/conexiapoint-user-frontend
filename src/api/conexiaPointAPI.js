import axios from "axios";
import { getCookie, getEnvVariables } from "../helpers";

const { VITE_API_URL } = getEnvVariables();

export const conexiaPointAPI = axios.create({
    baseURL: VITE_API_URL,
});

conexiaPointAPI.interceptors.request.use( config => {
    config.headers = {
        ...config.headers,
        'x-token': getCookie( 'auth-token' ),
    }
    return config;
} );

