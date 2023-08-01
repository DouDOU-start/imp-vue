import {DOWNLOAD, DOWNLOADSERIES, POST} from "@/api/api";

export async function uploadDicomApi(file: FormData) {
    return await POST('/file/dicom', file);
}

export async function downLoadSeriesApi(seriesId: number) {
    await DOWNLOADSERIES(`/file/series/${seriesId}`, null);
}

export async function downLoadSeriesLabelApi(fileLocation: string) {
    await DOWNLOAD(`/file/label/${fileLocation}`, null);
}