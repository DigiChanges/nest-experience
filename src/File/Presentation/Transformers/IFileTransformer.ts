
interface IFileTransformer
{
    id: string;
    originalFileId: string;
    versionUUID: string;
    name: string;
    originalName: string;
    mimeType: string;
    path: string;
    extension: string;
    size: number;
    version: number;
    encoding: string;
    isPublic: boolean;
    createdAt: number;
    updatedAt: number;
}

export default IFileTransformer;
