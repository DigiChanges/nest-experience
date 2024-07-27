import { from, map } from 'rxjs';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { IPaginator } from '../Criteria/IPaginator';

export abstract class Transformer<T, P>
{
    async handle(promiseData: Promise<T> | Promise<T[]>): Promise<unknown>
    {
        const observableData$ = from(promiseData);

         return observableData$.pipe(
            map((element: any) =>
            {
                if (Array.isArray(element))
                {
                    return element.map(item => this.transform(item));
                }
                else
                {
                    return this.transform(element);
                }
            }));
    }

    // TODO: Migrate to stream
    async paginate<S>(paginator: IPaginator): Promise<any>
    {
        const observablePaginate$ = from(paginator.paginate());

        paginator.getExist();

        return observablePaginate$.pipe(
            map((element: any) =>
            {
                const data  = element.map((item: any) => this.transform(item));
                const pagination = {
                    total: paginator.getTotal(),
                    offset: paginator.getOffset(),
                    limit: paginator.getLimit(),
                    perPage: paginator.getPerPage(),
                    currentPage: paginator.getCurrentPage(),
                    lastPage: paginator.getLasPage(),
                    from: paginator.getFrom(),
                    to: paginator.getTo(),
                    firstUrl: paginator.getFirstUrl(),
                    lastUrl: paginator.getLastUrl(),
                    nextUrl: paginator.getNextUrl(),
                    prevUrl: paginator.getPrevUrl(),
                    currentUrl: paginator.getCurrentUrl()
                };

                return {
                    data,
                    ...(paginator.getExist() ? { pagination } : {})
                };
            })
        );
    }

    abstract transform(data: T): P;

    getTimestamp(element: any)
    {
        dayjs.extend(utc);

        return {
            createdAt: dayjs(element.createdAt).utc().unix(),
            updatedAt: dayjs(element.updatedAt).utc().unix()
        };
    }
}
