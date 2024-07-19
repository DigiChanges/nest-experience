import { MapCriteria } from '@shared/Criteria/MapCriteria';

class ItemSort extends MapCriteria
{
    static readonly NAME: string = 'name';
    static readonly TYPE: string = 'type';

    getFields(): string[]
    {
        return [
            ItemSort.NAME,
            ItemSort.TYPE
        ];
    }

    getDefaults(): Record<string, 'asc' | 'desc'>[]
    {
        return [
            { [ItemSort.NAME]: 'asc' }
        ];
    }
}

export default ItemSort;
