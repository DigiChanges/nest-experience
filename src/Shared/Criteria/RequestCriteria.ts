import { ICriteria } from './ICriteria';
import { ISort } from './ISort';
import { IFilter } from './IFilter';
import { IPagination } from './IPagination';
import { IRequestCriteria } from './IRequestCriteria';

export class RequestCriteria implements ICriteria
{
    readonly sort: ISort;
    readonly filter: IFilter;
    readonly pagination: IPagination;

    constructor(criteria: IRequestCriteria)
    {
        this.sort = criteria.sort;
        this.filter = criteria.filter;
        this.pagination = criteria.pagination;
    }

    getSort(): ISort
    {
        return this.sort;
    }

    getFilter(): IFilter
    {
        return this.filter;
    }

    getPagination(): IPagination
    {
        return this.pagination;
    }
}
