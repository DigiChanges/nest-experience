
export interface IMapCriteria
{
    values(): Map<string, unknown>;
    get(key: string, defaultValue?: unknown): unknown;
    set(key: string, value: unknown): void
    getArray(key: string): unknown[];
    has(key: string): boolean;
    isEmpty(): boolean;
    getFields(): unknown[];
}
