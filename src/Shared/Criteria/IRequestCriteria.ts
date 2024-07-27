import { IPagination } from './IPagination';
import { IMapCriteria } from '@shared/Criteria/IMapCriteria';

export interface IRequestCriteria
{
    filter: IMapCriteria;
    sort: IMapCriteria;
    pagination: IPagination;
}
