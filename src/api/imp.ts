import type {ApiResult} from "@/api/api";
import {GET} from "@/api/api";

export interface GetSimpleSeriesParams {
    currentPage: number;
    pageSize: number;
    institutionIds: any;
    modality: any;
    sliceRange: any;
    bodyPartIds: any;
    patientSex: any;
    scanTypeIds: any;
    organIds: any;
}

export interface GetSimpleSeries {
    records: [],
    total: number,
    size: number,
    current: number,
    pages: number
}

export interface GetSeriesDetail {
    [key: string]: string | number | null,
    seriesNumber: string,
    seriesUid: string,
    seriesDescription: string,
    modality: string,
    pixelSpacing: string,
    sliceThickness: number,
    row: number,
    columns: number,
    instanceNum: number,
    patientAge: string,
    seriesAt: string,
    institutionName: string,
    patientNumber: string,
    patientName: string,
    patientSex: string
}

export interface GetSeriesInstance {
    id: number,
    instanceNumber: number
    instanceUid: string
    sliceLocation: number
    imageUrl: string
}

export interface GetSeriesLabel {
    id: number,
    fileName: string,
    fileLocation: string,
    createdAt: string
}

export async function getSimpleSeries(params: GetSimpleSeriesParams): Promise<ApiResult<GetSimpleSeries>> {
    return await GET('/imp/series', params);
}

export async function getSeriesDetail(seriesId: string): Promise<ApiResult<GetSeriesDetail>> {
    return await GET(`/imp/series/${seriesId}`, null);
}

export async function getSeriesInstance(seriesId: string): Promise<ApiResult<GetSeriesInstance[]>> {
    return await GET(`/imp/instance/${seriesId}`, null);
}

export async function getSeriesLabel(seriesId: string): Promise<ApiResult<GetSeriesLabel[]>> {
    return await GET(`/imp/label/${seriesId}`, null);
}