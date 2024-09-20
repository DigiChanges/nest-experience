import { MapCriteria } from '@shared/Criteria/MapCriteria';

class FileSort extends MapCriteria
{
    static readonly NAME: string = 'name';
    static readonly TYPE: string = 'type';

    getFields(): string[]
    {
        return [
            FileSort.NAME,
            FileSort.TYPE
        ];
    }

    getDefaults(): Record<string, 'asc' | 'desc'>[]
    {
        return [
            { [FileSort.NAME]: 'asc' }
        ];
    }
}

export default FileSort;
