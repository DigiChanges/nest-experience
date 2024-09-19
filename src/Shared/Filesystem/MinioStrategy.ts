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
    readonly #fileSystem: Client;
    readonly #bucket: string;
    readonly #rootPath: string;
    readonly #pathTemp: string;
    readonly #region: string;

    constructor(config: MinioConfig)
    {
        this.#bucket = config.bucket;
        this.#rootPath = config.rootPath;
        this.#region = config.region;

        this.#fileSystem = new Client({
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
        const name = payload.bucketName;
        const bucketNamePrivate = `${name}.private`;
        const bucketNamePublic = `${name}.public`;

        const region = payload.region;
        const bucketPrivatePolicy = payload.privateBucketPolicy;
        const bucketPublicPolicy = payload.publicBucketPolicy;

        await this.#fileSystem.makeBucket(bucketNamePrivate, region);
        await this.#fileSystem.setBucketPolicy(bucketNamePrivate, bucketPrivatePolicy);

        await this.#fileSystem.makeBucket(bucketNamePublic, region);
        await this.#fileSystem.setBucketPolicy(bucketNamePublic, bucketPublicPolicy);
    }

    async setBucketPolicy(payload: SetBucketPolicyPayload): Promise<void>
    {
        const name = payload.bucketName ?? this.#bucket;
        await this.#fileSystem.setBucketPolicy(name, payload.bucketPolicy);
    }

    async uploadFile(payload: UploadFilePayload): Promise<void>
    {
        const acl = payload.isPublic ? 'public-read' : 'private';
        const objectName = `${this.#rootPath}/${payload.objectPath}`;
        const bucketName = this.getBucketName(payload.isPublic);

        await this.#fileSystem.fPutObject(bucketName, objectName, payload.fileTempPath, { 'x-amz-acl': acl });
    }

    async downloadFile(object: DownloadFilePayload): Promise<Readable>
    {
        const filePath = `${this.#rootPath}/${object.objectName}`;
        const bucketName = this.getBucketName(object.isPublic);

        return await this.#fileSystem.getObject(bucketName, filePath);
    }

    async removeObject(object: RemoveFilePayload): Promise<void>
    {
        const bucketName = this.getBucketName(object.isPublic);
        await this.#fileSystem.removeObject(bucketName, object.objectName);
    }

    private getBucketName(isResourcePublic: boolean)
    {
        const resourceVisibility = isResourcePublic ? 'public' : 'private';
        return `${this.#bucket}.${resourceVisibility}`;
    }
}
