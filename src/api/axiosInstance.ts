import axios from "axios";
import type {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {ElMessage} from "element-plus";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: '/api',
    timeout: 5000,
});

// 添加请求拦截器
axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // 在发送请求之前做些什么
        return config;
    },
    (error: any) => {
        // 处理请求错误
        return Promise.reject(error);
    },
);

// 添加响应拦截器
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // 对响应数据做点什么
        return response;
    },
    (error: any) => {
        // 处理响应错误
        if (500 === error.response.status) {
            ElMessage.error(`服务器错误，请联系管理员！`)
        }
        return Promise.reject(error);
    },
);

export default axiosInstance;