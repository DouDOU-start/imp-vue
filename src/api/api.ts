import axiosInstance from "@/api/axiosInstance";

export interface ApiResult<T> {
    code: number;
    message: string;
    data: T;
}

export async function GET<T>(url: string, params?: any): Promise<ApiResult<T>> {
    const response = await axiosInstance.get<ApiResult<T>>(url, { params });
    return response.data;
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
    const response = await axiosInstance.delete<ApiResult<T>>(url, { params });
    return response.data;
}