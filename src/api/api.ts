import axiosInstance from "@/api/axiosInstance";
import type {AxiosResponse} from "axios";
import axios from "axios";
import {ElMessage} from "element-plus";

export interface ApiResult<T> {
    code: number;
    message: string;
    data: T;
}

export async function GET<T>(url: string, params?: any): Promise<ApiResult<T>> {
    const response = await axiosInstance.get<ApiResult<T>>(url, {params});
    return response.data;
}

export type ProgressCallback = (progress: number) => void;

export async function DOWNLOAD(url: string, params?: any, progressCallback: ProgressCallback): Promise<AxiosResponse> {

    const downloadAxiosInstance= axios.create({
        baseURL: '/api',
        timeout: 30000,
    });

    const response = await downloadAxiosInstance({
        method: 'GET',
        url,
        responseType: 'blob',
        onDownloadProgress: (progressEvent) => {
            const loaded = progressEvent.loaded;
            const total = progressEvent.total;
            const progress = Math.round((loaded * 100) / total);
            progressCallback(progress);
        },
    })

    downloadAxiosInstance.interceptors.response.use(
        (response: AxiosResponse) => {
            return response;
        },
        (error: any) => {
            ElMessage.error(`文件下载失败！！！`)
            return Promise.reject(error);
        },
    )

    const blob = new Blob([response.data]);
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = response.headers['content-disposition'].split('filename=')[1];
    link.click();
    URL.revokeObjectURL(downloadUrl);

}

export async function POST<T>(url: string, data?: any): Promise<ApiResult<T>> {
    const response = await axiosInstance.post<ApiResult<T>>(url, data);
    return response.data;
}

export async function PUT<T>(url: string, data?: any): Promise<ApiResult<T>> {
    const response = await axiosInstance.put<ApiResult<T>>(url, data);
    return response.data;
}

export async function DEL<T>(url: string, params?: any): Promise<ApiResult<T>> {
    const response = await axiosInstance.delete<ApiResult<T>>(url, {params});
    return response.data;
}