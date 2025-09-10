import axios from "axios";
import { config } from "./config";
import { router } from "./src/router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { AppError } from "./errors/AppError";


export const api = axios.create({
    baseURL: config.api_url,
    withCredentials: true
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const serverMessage = error.response.data?.message || "Unknown error";

        if (config.active_log_api) { console.error(error.response); }

        const appError = new AppError(serverMessage , error?.response.status )

        if (error.response && error.response.status === 401) {
            router.push({ name: 'Login' }).then(() => {
                toast.warn(serverMessage);
            });
        }

        return Promise.reject(appError);
    }
);