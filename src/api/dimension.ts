import {ApiResult, GET} from "@/api/api";

export interface Institution {
    id: number;
    institutionName: string;
    institutionAddress: string;
}

export async function getInstitution(): Promise<ApiResult<Array<Institution>>> {
    return await GET('/dimension/institution');
}