import { Query } from 'mongoose';
import { BasePaginator } from '../Criteria';
import { IPaginator } from '../Criteria/IPaginator';
import { ICriteria } from '../Criteria/ICriteria';

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
        const sorts = this.sort.get();
        const _objectSort = {};

        sorts.forEach((value: string, key: string) =>
        {
            let order: any = value.toUpperCase();
            order = (order === 'DESC') ? -1 : 1;

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
