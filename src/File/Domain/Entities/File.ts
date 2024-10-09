import { randomUUID } from 'crypto';

import BaseDomain from '@shared/Entities/BaseDomain';

import IFileDomain from './IFileDomain';

class File extends BaseDomain implements IFileDomain
{
    constructor()
    {
        super();
        this._id = randomUUID();
        this.originalFileId = this._id;
        this.versionUUID = randomUUID();
    }

    _id: string;
    originalFileId: string;
    versionUUID: string;
    fileName: string;
    originalName: string;
    name: string;
    mimeType: string;
    path: string;
    extension: string;
    size: number;
    version: number;
    encoding: string;
    isPublic: boolean;
    isOptimized: boolean;

    isOriginal(): boolean
    {
        return this.originalFileId === this._id;
    }
}

export default File;
