import { MapCriteria } from '@shared/Criteria/MapCriteria';

class ItemFilter extends MapCriteria
{
    static readonly NAME: string = 'name';
    static readonly TYPE: string = 'type';

    getFields(): string[]
    {
        return [
            ItemFilter.NAME,
            ItemFilter.TYPE
        ];
    }

    getDefaults(): Record<string, number | boolean | string>[]
    {
        return [];
    }
}

export default ItemFilter;
