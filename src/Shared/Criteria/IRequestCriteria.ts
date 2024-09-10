import { IMapCriteria } from '@shared/Criteria/IMapCriteria';

import { IPagination } from './IPagination';

export interface IRequestCriteria
{
    filter: IMapCriteria;
    sort: IMapCriteria;
    pagination: IPagination;
}
