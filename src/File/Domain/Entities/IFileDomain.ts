import IBaseDomain from '../../../Shared/Entities/IBaseDomain';

interface IFileDomain extends IBaseDomain
{
    originalFileId: string;
    versionUUID: string;
    fileName: string;
    name: string;
    originalName: string;
    mimeType: string;
    path: string;
    extension: string;
    size: number;
    version: number;
    encoding: string;
    isPublic: boolean;
    isOptimized: boolean;
    isOriginal(): boolean;
}

export default IFileDomain;

/**
[
    {
        originalFileId: UUID;
        versionUUID: UUID;
        name: 'mi-imagen';
        originalName: 'Mi Imagen';
        mimeType: 'image/jpeg';
        path: 'ID/versionUUID';
        extension: 'jpeg';
        size: 120;
        version: 1;
        isPublic: true;
        isOptimized: false;
    },
    {
        originalFileId: UUID;
        versionUUID: UUID;
        name: 'mi-imagen';
        originalName: 'Mi Imagen';
        mimeType: 'image/jpeg';
        path: 'ID/versionUUID';
        extension: 'jpeg';
        size: 120;
        version: 2;
        isPublic: true;
        isOptimized: false;
    }
]
**/
