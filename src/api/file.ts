import { POST } from "@/api/api";

export async function uploadDicomApi(file: FormData) {
    return await POST('/file/dicom', file);
}