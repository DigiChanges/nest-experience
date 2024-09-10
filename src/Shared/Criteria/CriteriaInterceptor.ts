import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CRITERIAS } from '@shared/Criteria/CriteriasDecorator';
import { RequestCriteria } from '@shared/Criteria/RequestCriteria';
import Pagination from '@shared/Utils/Pagination';
import { ParsedQs } from 'qs';
import { Observable } from 'rxjs';

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
