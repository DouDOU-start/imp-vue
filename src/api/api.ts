import axiosInstance from "@/api/axiosInstance";
import type {AxiosResponse} from "axios";
import axios from "axios";
import eventBus from "@/libs/eventBus";
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

export async function DOWNLOADSERIES(url: string, params?: any) {

    const downloadAxiosInstance= axios.create({
        baseURL: '/api',
        timeout: 30000,
    });

    const response = await downloadAxiosInstance({
        method: 'GET',
        url,
        responseType: 'blob',
        onDownloadProgress: (progressEvent) => {
            const loaded: number = progressEvent.loaded;
            const total: any = progressEvent.total;
            const progress: number = Math.round((loaded * 100) / total);

            eventBus.emit('updateTask', [
                Number(url.substring(url.lastIndexOf("/") + 1)),
                {
                    "progress": progress
                }
            ])
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

    eventBus.emit('updateTask', [
        Number(url.substring(url.lastIndexOf("/") + 1)),
        {
            "href": URL.createObjectURL(new Blob([response.data])),
            "download": response.headers['content-disposition'].split('filename=')[1],
            "progress": 100
        }
    ])

}

export async function DOWNLOAD(url: string) {

    const downloadAxiosInstance= axios.create({
        baseURL: '/api',
        timeout: 30000,
    });

    const response = await downloadAxiosInstance({
        method: 'GET',
        url,
        responseType: 'blob',
    })

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(new Blob([response.data]));
    link.setAttribute('download', decodeURIComponent(response.headers['content-disposition'].split('filename=')[1],));
    document.body.appendChild(link);
    link.click();
    link.remove()

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