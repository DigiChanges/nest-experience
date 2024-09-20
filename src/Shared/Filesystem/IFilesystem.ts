import { Readable } from 'node:stream';

import {
    CreateBucketPayload,
    DownloadFilePayload,
    RemoveFilePayload,
    SetBucketPolicyPayload,
    UploadFilePayload
} from '@shared/Filesystem/Payloads';

export abstract class IFilesystem
{
    abstract uploadFile(object: UploadFilePayload): Promise<void>;
    abstract downloadFile(object: DownloadFilePayload): Promise<Readable>;
    abstract createBucket(payload: CreateBucketPayload): Promise<void>;
    abstract removeObject(object: RemoveFilePayload): Promise<void>;
    abstract setBucketPolicy(payload: SetBucketPolicyPayload): Promise<void>;
}
