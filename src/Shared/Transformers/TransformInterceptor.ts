import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PAGINATE_DATA } from '@shared/Criteria/PaginateDecorator';
import { Transformer } from '@shared/Transformers/index';
import { TRANSFORM_TYPE_CLASS } from '@shared/Transformers/TransformDecorator';
import { firstValueFrom } from 'rxjs';


@Injectable()
class TransformInterceptor implements NestInterceptor
{
  constructor(
    private readonly reflector: Reflector
  )
  {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<any>
  {
    const transformClass:  { new (...args: unknown[]): Transformer<unknown, unknown> } = this.reflector.getAllAndOverride(TRANSFORM_TYPE_CLASS, [
      context.getHandler()
    ]);

    const paginate = this.reflector.getAllAndOverride(PAGINATE_DATA, [
      context.getHandler()
    ]) ?? false;

    if (paginate)
    {
      return (new transformClass()).paginate((await firstValueFrom(next.handle())));
    }

    return (new transformClass()).handle(firstValueFrom(next.handle()));
  }
}

export default TransformInterceptor;
