import { CreateBucketPayload } from '@shared/Filesystem/Payloads';

abstract class ICreateBucketCommandRequest implements CreateBucketPayload
{
  abstract bucketName: string;
  abstract region: string;
  abstract publicBucketPolicy: string;
  abstract privateBucketPolicy: string;
}

export default ICreateBucketCommandRequest;
