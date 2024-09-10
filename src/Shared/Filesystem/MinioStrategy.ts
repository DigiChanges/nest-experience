import { Readable } from 'node:stream';

import { Injectable } from '@nestjs/common';
import { IFilesystem } from '@shared/Filesystem/IFilesystem';
import {
    CreateBucketPayload,
    DownloadFilePayload,
    RemoveFilePayload, SetBucketPolicyPayload,
    UploadFilePayload
} from '@shared/Filesystem/Payloads';
import { Client } from 'minio';

export interface MinioConfig
{
    endPoint: string;
    accessKey: string;
    secretKey: string;
    useSSL: boolean;
    port: number;
    bucket: string;
    rootPath: string;
    region: string;
}

@Injectable()
export class MinioStrategy implements IFilesystem
{
    readonly #filesystem: Client;
    readonly #bucket: string;
    readonly #rootPath: string;
    readonly #pathTemp: string;
    readonly #region: string;

    constructor(config: MinioConfig)
    {
        this.#bucket = config.bucket;
        this.#rootPath = config.rootPath;
        this.#region = config.region;

        this.#filesystem = new Client({
            endPoint: config.endPoint,
            accessKey: config.accessKey,
            secretKey: config.secretKey,
            region: config.region,
            port: config.port,
            useSSL: config.useSSL
        });
    }

    async createBucket(payload: CreateBucketPayload): Promise<void>
    {
        return this.#filesystem.makeBucket(payload.bucketName, payload.region ?? this.#region);
    }

    async setBucketPolicy(payload: SetBucketPolicyPayload): Promise<void>
    {
        const name = payload.bucketName ?? this.#bucket;
        await this.#filesystem.setBucketPolicy(name, payload.bucketPolicy);
    }

    async uploadFile(payload: UploadFilePayload): Promise<void>
    {
        const acl = payload.isPublic ? 'public-read' : 'private';
        const objectName = `${this.#rootPath}/${payload.objectPath}`;

        await this.#filesystem.fPutObject(this.#bucket, objectName, payload.fileTempPath, { 'x-amz-acl': acl });
    }

    async downloadFile(object: DownloadFilePayload): Promise<Readable>
    {
        const filePath = `${this.#rootPath}/${object.objectName}`;

        return await this.#filesystem.getObject(this.#bucket, filePath);
    }

    async removeObject(object: RemoveFilePayload): Promise<void>
    {
        await this.#filesystem.removeObject(this.#bucket, object.objectName);
    }
}
