import { MapCriteria } from '@shared/Criteria/MapCriteria';

class FileFilter extends MapCriteria
{
    static readonly NAME: string = 'name';

    getFields(): string[]
    {
        return [
            FileFilter.NAME
        ];
    }

    getDefaults(): Record<string, number | boolean | string>[]
    {
        return [];
    }
}

export default FileFilter;
