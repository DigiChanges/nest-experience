
export interface UploadFilePayload
{
  objectPath: string;
  fileTempPath: string;
  size: number;
  isPublic: boolean;
}

export interface DownloadFilePayload
{
  objectName: string;
  isPublic: boolean;
}


export interface RemoveFilePayload extends DownloadFilePayload {}

export interface CreateBucketPayload
{
  bucketName: string;
  region?: string;
  publicBucketPolicy: string;
  privateBucketPolicy: string;
}

export interface SetBucketPolicyPayload
{
  bucketPolicy: string;
  bucketName?: string;
}
