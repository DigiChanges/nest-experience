import { ICriteria } from '../Criteria/ICriteria';
import { IPaginator } from '../Criteria/IPaginator';

import IByOptions from './IByOptions';

abstract class IBaseRepository<T>
{
    abstract save(element: T): Promise<T>;
    abstract update(element: T): Promise<T>;
    abstract getOne(id: string): Promise<T>;
    abstract delete(id: string): Promise<T>;
    abstract getBy(condition: Record<string, any>, options: IByOptions): Promise<T[]>;

    abstract getOneBy(condition: Record<string, any>, options: IByOptions): Promise<T | null>;
    abstract getInBy(condition: Record<string, string[]>): Promise<T[]>;

    abstract list(criteria: ICriteria): IPaginator;
}

export default IBaseRepository;
