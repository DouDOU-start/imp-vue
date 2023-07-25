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
    seriesNumber: string,
    seriesUid: number,
    seriesDescription: number,
    modality: string,
    pixelSpacing: string,
    sliceThickness: number,
    row: number,
    columns: number,
    patientAge: number,
    seriesAt: string,
    institutionName: string,
    patientNumber: string,
    patientName: string,
    patientSex: string
}

export async function getSimpleSeries(params: GetSimpleSeriesParams): Promise<ApiResult<GetSimpleSeries>> {
    return await GET('/imp/series', params);
}

export async function getSeriesDetail(seriesId: string): Promise<ApiResult<GetSeriesDetail>> {
    return await GET(`/imp/series/${seriesId}`, null);
}