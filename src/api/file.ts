import {DOWNLOAD, POST} from "@/api/api";

export async function uploadDicomApi(file: FormData) {
    return await POST('/file/dicom', file);
}

export async function downLoadSeriesApi(seriesId: number) {
    await DOWNLOAD(`/file/series/${seriesId}`, null);
}