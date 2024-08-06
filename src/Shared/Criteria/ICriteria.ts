import { IPagination } from './IPagination';
import { IMapCriteria } from '@src/Shared/Criteria/IMapCriteria';

export interface ICriteria
{
    getPagination(): IPagination;
    getFilter(): IMapCriteria;
    getSort(): IMapCriteria;
}
