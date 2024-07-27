
export interface IPagination
{
    getLimit(): number;
    getOffset(): number;
    getCurrentUrl(): string;
    getNextUrl(): string;
    getExist(): boolean;
}
