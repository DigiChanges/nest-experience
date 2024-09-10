import { Query } from 'mongoose';

import { BasePaginator } from '../Criteria';
import { ICriteria } from '../Criteria/ICriteria';
import { IPaginator } from '../Criteria/IPaginator';

class MongoosePaginator extends BasePaginator implements IPaginator
{
    #documentQuery: Query<unknown[], unknown>;

    constructor(documentQuery: Query<unknown[], unknown>, criteria: ICriteria)
    {
        super(criteria);
        this.#documentQuery = documentQuery;
    }

    public async paginate<T>(): Promise<T[]>
    {
        this.total = await ((this.#documentQuery).clone()).countDocuments();

        this.addOrderBy();
        this.addPagination();

        this.setPerPage(this.perPage);
        this.setCurrentPage();
        this.setLasPage();
        this.setFrom();
        this.setTo();

        const data  = await this.#documentQuery.find().exec();
        this.perPage = data.length;

        return data as T[];
    }

    private addOrderBy()
    {
        const sorts: Map<string, unknown> = this.sort.values();
        const _objectSort = {};

        sorts.forEach((value: string, key: string) =>
        {
            const order: number = (value.toUpperCase() === 'DESC') ? -1 : 1;

            const obj = { [key]: order };
            Object.assign(_objectSort, obj);
        });

        void this.#documentQuery.sort(_objectSort);
    }

    private addPagination()
    {
        const exist = this.pagination.getExist();

        if (exist)
        {
            void this.#documentQuery
                .skip(this.pagination.getOffset())
                .limit(this.pagination.getLimit());
        }
    }
}

export default MongoosePaginator;
