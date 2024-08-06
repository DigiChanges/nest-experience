import { IPagination } from './IPagination';
import { IMapCriteria } from '@src/Shared/Criteria/IMapCriteria';

export interface IRequestCriteria
{
    filter: IMapCriteria;
    sort: IMapCriteria;
    pagination: IPagination;
}
