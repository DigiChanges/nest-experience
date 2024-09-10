import { IMapCriteria } from '@shared/Criteria/IMapCriteria';

import { IPagination } from './IPagination';

export interface ICriteria
{
    getPagination(): IPagination;
    getFilter(): IMapCriteria;
    getSort(): IMapCriteria;
}
