import type {ApiResult} from "@/api/api";
import {GET} from "@/api/api";

export interface Page<T> {
    records: T[];
    total: number;
}


export interface Institution {
    id: number;
    institutionName: string;
    institutionAddress: string;
}

export interface BodyPart {
    id: number;
    bodyName: string;
}

export interface ScanType {
    id: number;
    scanTypeName: string;
}

export interface OrganItem {
    id: number;
    organName: string;
}

export async function getInstitution(): Promise<ApiResult<Array<Institution>>> {
    return await GET('/dimension/institution');
}

export async function getModality(): Promise<ApiResult<Array<string>>> {
    return await GET('/dimension/modality')
}

export async function getBodyPart(): Promise<ApiResult<Page<BodyPart>>> {
    return await GET('/dimension/bodyPart');
}

export async function getScanType(): Promise<ApiResult<Page<ScanType>>> {
    return await GET('/dimension/scanType');
}

export async function getOrgan(): Promise<ApiResult<Page<OrganItem>>> {
    return await GET('/dimension/humanOrgan');
}