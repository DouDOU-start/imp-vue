import type {ApiResult} from "@/api/api";
import {GET} from "@/api/api";

export interface GetSimpleSeriesParams {
    currentPage: number;
    pageSize: number;
    institutionIds: any;
}

export interface GetSimpleSeries {
    records: [],
    total: number,
    size: number,
    current: number,
    pages: number
}

export async function getSimpleSeries(params: GetSimpleSeriesParams): Promise<ApiResult<GetSimpleSeries>> {
    return await GET('/imp/series', params);
}