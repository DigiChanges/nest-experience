import { MapCriteria } from '@shared/Criteria/MapCriteria';

class ItemSort extends MapCriteria
{
    static readonly NAME: string = 'name';
    static readonly DESCRIPTION: string = 'description';

    getFields(): string[]
    {
        return [
            ItemSort.NAME,
            ItemSort.DESCRIPTION
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
