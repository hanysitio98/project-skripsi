import Axios, {
    AxiosInstance,
} from 'axios';

import {
    currentLanguage
} from 'storages';


const axiosInstance = Axios.create({
    baseURL: process.env.REACT_APP_API_HOSTNAME,
    timeout: Number(process.env.REACT_APP_API_TIMEOUT),
    headers: {
        'X-Channel': process.env.REACT_APP_CHANNEL || '',
        'X-OID': '',
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'Accept-Languange': currentLanguage.get()
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.token) {
            config.headers["Authorization"] = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (res) => {
        return res;
    },

    async (err) => {
        const originalConfig = err.config;
        if (originalConfig.url !== "/auth/signin" && err.response) {
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    const user = JSON.parse(localStorage.getItem("user"));
                    const rs = await axiosInstance.post("/auth/refreshToken", {
                        refreshToken: user.refreshToken
                    });

                    localStorage.setItem("user", JSON.stringify(rs.data));
                    return axiosInstance(originalConfig);
                } catch (error) {
                    localStorage.removeItem("user");
                    window.location = "/signin";
                }
            }
        }

        return Promise.reject(err);
    }
);


export default axiosInstance;