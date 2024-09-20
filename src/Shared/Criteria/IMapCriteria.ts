
export interface IMapCriteria
{
    values(): Map<string, number | boolean | string>;
    get(key: string, defaultValue?: number | boolean | string): number | boolean | string;
    set(key: string, value: number | boolean | string): void
    getArray(key: string): IterableIterator<[string, number | boolean | string]>;
    has(key: string): boolean;
    isEmpty(): boolean;
    getFields(): string[];
}
