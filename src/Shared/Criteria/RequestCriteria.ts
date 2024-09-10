import { IMapCriteria } from '@shared/Criteria/IMapCriteria';

import { ICriteria } from './ICriteria';
import { IPagination } from './IPagination';
import { IRequestCriteria } from './IRequestCriteria';

export class RequestCriteria implements ICriteria
{
    readonly sort: IMapCriteria;
    readonly filter: IMapCriteria;
    readonly pagination: IPagination;

    constructor(criteria: IRequestCriteria)
    {
        this.sort = criteria.sort;
        this.filter = criteria.filter;
        this.pagination = criteria.pagination;
    }

    getSort(): IMapCriteria
    {
        return this.sort;
    }

    getFilter(): IMapCriteria
    {
        return this.filter;
    }

    getPagination(): IPagination
    {
        return this.pagination;
    }
}
