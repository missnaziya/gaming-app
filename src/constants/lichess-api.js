import axios from "axios";

const config = {
    baseURL: process.env.GATSBY_CHESS_APP_BASE_URL,
    timeout: 250000,
    headers: {
        "Content-Type": "application/json",
    },
};

// 1. Use this service when loader is not required, but token is required
export const LichessServiceLoaderless = axios.create(config);

// request interceptor
LichessServiceLoaderless.interceptors.request.use(
    async (config) => {
        // handle add token in request
        const token = window?.localStorage?.chessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// response interceptor
LichessServiceLoaderless.interceptors.response.use(
    async (response) => {
        // handle failures
        return response;
    },

    async (error) => {
        return Promise.reject(error);
    }
);

// 2. Use this service when loader and token, both are required
const LichessService = axios.create(config);

// request interceptor
LichessService.interceptors.request.use(
    async (config) => {
        // spinning start to show
        document.body.classList.add("loading-indicator");
        // handle add token
        const token = window?.localStorage?.chessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
        return config;
    },
    (error) => {
        document.body.classList.remove("loading-indicator");
        return Promise.reject(error);
    }
);

// response interceptor
LichessService.interceptors.response.use(
    async (response) => {
        // handle error
        // spinning hide
        document.body.classList.remove("loading-indicator");
        return response;
    },

    async (error) => {
        document.body.classList.remove("loading-indicator");
        return Promise.reject(error);
    }
);

// 3. Use this service, when loader is required but token is not required
export const LichessServiceTokenless = axios.create(config);

// request interceptor
LichessServiceTokenless.interceptors.request.use(
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
LichessServiceTokenless.interceptors.response.use(
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

export const LichessServiceBasic = axios.create(config);

export default LichessService;
