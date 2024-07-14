import { ParsedQs } from 'qs';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { ICriteria } from './ICriteria';
import { RequestCriteria } from './RequestCriteria';
import Pagination from '../Utils/Pagination';

export const Criteria = createParamDecorator((data: any, ctx: ExecutionContext) =>
    {
        const request = ctx.switchToHttp().getRequest();

        const elementFilter = data[0];
        const elementSort = data[1];

        const requestCriteria: ICriteria = new RequestCriteria({
            filter: new elementFilter(request.query as ParsedQs),
            sort: new elementSort(request.query as ParsedQs),
            pagination: new Pagination(request.query as ParsedQs, request.url)
        });

        return requestCriteria;
    }
);
