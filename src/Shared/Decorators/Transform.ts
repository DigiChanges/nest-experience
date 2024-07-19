import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import { Transformer } from '@shared/Transformers';
import TransformInterceptor from '@shared/Interceptors/TransformInterceptor';

export const TRANSFORM_TYPE_CLASS = 'TRANSFORM_TYPE_CLASS';

const Transform = (transform: typeof Transformer<any, any>) =>
{
  return applyDecorators(
    SetMetadata(TRANSFORM_TYPE_CLASS, transform),
    UseInterceptors(TransformInterceptor)
  );
};


export default Transform;
