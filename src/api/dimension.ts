import type {ApiResult} from "@/api/api";
import {GET} from "@/api/api";

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

export interface Organ {
    id: number;
    organName: string;
}

export async function getInstitution(): Promise<ApiResult<Array<Institution>>> {
    return await GET('/dimension/institution');
}

export async function getModality(): Promise<ApiResult<Array<string>>> {
    return await GET('/dimension/modality')
}

export async function getBodyPart(): Promise<ApiResult<Array<BodyPart>>> {
    return await GET('/dimension/bodyPart');
}

export async function getScanType(): Promise<ApiResult<Array<ScanType>>> {
    return await GET('/dimension/scanType');
}

export async function getOrgan(): Promise<ApiResult<Array<Organ>>> {
    return await GET('/dimension/humanOrgan');
}