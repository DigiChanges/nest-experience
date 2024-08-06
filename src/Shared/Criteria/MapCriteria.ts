import { ParsedQs } from 'qs';
import { IMapCriteria } from '@shared/Criteria/IMapCriteria';

export abstract class MapCriteria implements IMapCriteria
{
    private readonly criterias: Map<string, any>;

    constructor(query: ParsedQs)
    {
        this.criterias = new Map<string, unknown>();
        const queryFilters: any = query ?? {};
        const defaults: any = this.getDefaults();
        const keys = this.getFields();

        defaults.forEach((defaultFilter: any) =>
        {
            const defaultKey: string = Object.keys(defaultFilter)[0];
            const defaultValue: string = defaultFilter[defaultKey];
            this.setValue(defaultKey, defaultValue);
        });
        const criterias = Object.keys(queryFilters).map((key: string) =>
        {
            const filter: Record<string, unknown> = query as Record<string, unknown>;
            let value = {};

            if (filter[key] !== undefined && filter[key] !== null)
            {
                value = {
                    [key]: filter[key]
                };
            }

            return value;
        }).filter((value =>
        {
            const key = Object.keys(value)[0];
            return keys.includes(key) ? value : false;
        }));

        criterias.forEach((newFilter: any) =>
        {
            const defaultKey: string = Object.keys(newFilter)[0];
            const defaultValue: string = newFilter[defaultKey];

            this.setValue(defaultKey, defaultValue);
        });
    }

    private setValue(key: string, value: unknown)
    {
        if (value !== undefined && value !== null)
        {
            this.criterias.set(key, value);
        }
    }

    get<T>(key: string, defaultValue: unknown = null): T
    {
        return this.criterias.has(key) ? this.criterias.get(key) : defaultValue;
    }

    set(key: string, value: unknown): void
    {
        this.criterias.set(key as any, value);
    }

    has(key: string): boolean
    {
        return this.criterias.has(key);
    }

    isEmpty(): boolean
    {
        return this.criterias.size === 0;
    }

    getArray(): any
    {
        return this.criterias.entries();
    }

    values(): Map<string, unknown>
    {
        return this.criterias;
    }

    abstract getFields(): string[];
    abstract getDefaults(): unknown[];
}
