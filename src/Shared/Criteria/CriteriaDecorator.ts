import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Criteria = createParamDecorator((data: any, ctx: ExecutionContext) =>
    {
        const request = ctx.switchToHttp().getRequest();
        return request['criteria'];
    }
);
