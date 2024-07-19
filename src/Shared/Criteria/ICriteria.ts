import { IPagination } from './IPagination';
import { IMapCriteria } from '@shared/Criteria/IMapCriteria';

export interface ICriteria
{
    getPagination(): IPagination;
    getFilter(): IMapCriteria;
    getSort(): IMapCriteria;
}
