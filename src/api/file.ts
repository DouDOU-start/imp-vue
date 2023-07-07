import {DOWNLOAD, POST, ProgressCallback} from "@/api/api";

export async function uploadDicomApi(file: FormData) {
    return await POST('/file/dicom', file);
}

export async function downLoadSeriesApi(seriesId: number, callback: ProgressCallback) {
    return await DOWNLOAD(`/file/series/${seriesId}`, null, callback);
}