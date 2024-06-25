import axios from "axios";

const config = {
    baseURL: process.env.GATSBY_BASE_URL,
    timeout: 25000,
    headers: {
        "Content-Type": "application/json",
    },
};

// axios instance creation
export const KonfehtiServiceLoaderless = axios.create(config);
const KonfehtiService = axios.create(config);

// request interceptor
KonfehtiService.interceptors.request.use(
    async (config) => {
        // spinning start to show
        document.body.classList.add("loading-indicator");
        return config;
    },
    (error) => {
        document.body.classList.remove("loading-indicator");
        return Promise.reject(error);
    }
);

// response interceptor
KonfehtiService.interceptors.response.use(
    async (response) => {
        // spinning hide
        document.body.classList.remove("loading-indicator");
        return response;
    },

    async (error) => {
        document.body.classList.remove("loading-indicator");
        return Promise.reject(error);
    }
);

export default KonfehtiService;
