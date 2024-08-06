import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { RequestCriteria } from '@src/Shared/Criteria/RequestCriteria';
import { ParsedQs } from 'qs';
import Pagination from '@src/Shared/Utils/Pagination';
import { CRITERIAS } from '@src/Shared/Criteria/CriteriasDecorator';

@Injectable()
class CriteriaInterceptor implements NestInterceptor
{
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any>
  {
    const request = context.switchToHttp().getRequest();

    const [filter, sort] = this.reflector.getAllAndOverride(CRITERIAS, [
      context.getHandler()
    ]);

    const url = `${request.protocol}://${request.hostname}${request?.raw.url}`;

    request['criteria'] = new RequestCriteria({
      filter: new filter(request?.query?.filter ?? {} as ParsedQs),
      sort: new sort(request?.query?.sort ?? {} as ParsedQs),
      pagination: new Pagination(request.query as ParsedQs, url)
    });

    return next.handle();
  }
}

export default CriteriaInterceptor;
