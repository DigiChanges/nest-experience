import CreateBucketPayload from '../../Domain/Payloads/CreateBucketPayload';
class CreateBucketQuery
{
  constructor(public payload: CreateBucketPayload) {}
}

export default CreateBucketQuery;
