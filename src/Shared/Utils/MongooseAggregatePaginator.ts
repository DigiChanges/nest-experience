import { Aggregate } from 'mongoose';
import { IPaginator } from '../Criteria/IPaginator';
import { BasePaginator } from '../Criteria';
import { ICriteria } from '../Criteria/ICriteria';

class MongooseAggregatePaginator extends BasePaginator implements IPaginator
{
    private aggregate: Aggregate<unknown[]>;

    constructor(aggregate: Aggregate<unknown[]>, criteria: ICriteria)
    {
        super(criteria);
        this.aggregate = aggregate;
    }

    public async paginate<T>(): Promise<T[]>
    {
        this.addOrderBy();
        this.addPagination();

        this.setPerPage(this.perPage);
        this.setCurrentPage();
        this.setLasPage();
        this.setFrom();
        this.setTo();

        const data = await this.aggregate.exec();
        this.total = data.length;
        this.perPage = data.length;

        return data as T[];
    }

    private addOrderBy()
    {
        const sorts = this.sort.get();
        const _objectSort = {};

        sorts.forEach((value: string, key: string) =>
        {
            let order: any = value.toUpperCase();
            order = (order === 'DESC') ? -1 : 1;

            const obj = { [key]: order };
            Object.assign(_objectSort, obj);
        });

        void this.aggregate.sort(_objectSort);
    }

    private addPagination()
    {
        const exist = this.pagination.getExist();

        if (exist)
        {
            void this.aggregate
                .skip(this.pagination.getOffset())
                .limit(this.pagination.getLimit());
        }
    }
}

export default MongooseAggregatePaginator;
