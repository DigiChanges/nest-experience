import * as qs from 'qs';

import { IPagination } from '../Criteria/IPagination';

class Pagination implements IPagination
{
    private readonly limit: number;
    private readonly offset: number;
    private readonly exist: boolean = false;
    private pagination: any;
    private readonly url: string;

    constructor(query: qs.ParsedQs, url: string)
    {
        this.url = url;
        this.pagination = query.pagination;
        this.limit = query?.pagination ? +this.pagination.limit : 10;
        this.offset = query?.pagination ? +this.pagination.offset : 0;
        this.exist = query?.pagination !== undefined;
    }

    getLimit(): number
    {
        return this.limit;
    }

    getOffset(): number
    {
        return this.offset;
    }

    getCurrentUrl(): string
    {
        return this.exist ? this.url : '';
    }

    getNextUrl(): string
    {
        let url = '';

        if (this.exist)
        {
            const offset = this.offset + this.limit;

            url = this.url;
            const searchValue = `pagination[offset]=${this.pagination.offset}`;
            const newValue = `pagination[offset]=${offset}`;

            url = url.replace(searchValue, newValue);
        }

        return url;
    }

    getExist(): boolean
    {
        return this.exist;
    }
}

export default Pagination;
