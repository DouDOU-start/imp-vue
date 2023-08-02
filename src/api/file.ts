import {DEL, DOWNLOAD, DOWNLOADSERIES, POST} from "@/api/api";

export async function uploadDicomApi(file: FormData) {
    return await POST('/file/dicom', file);
}

export async function uploadLabelApi(seriesId: string, file: FormData) {
    return await POST(`/file/label/${seriesId}`, file);
}

export async function downLoadSeriesApi(seriesId: number) {
    await DOWNLOADSERIES(`/file/series/${seriesId}`, null);
}

export async function delSeriesLabelApi(seriesId: string, fileName: string) {
    await DEL(`/file/label/${seriesId}/${fileName}`, null);
}

export async function downLoadSeriesLabelApi(fileLocation: string) {
    await DOWNLOAD(`/file/label/${fileLocation}`);
}