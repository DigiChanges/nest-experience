
export interface IPaginator
{
    paginate<T>(): Promise<T[]>;
    getTotal(): number;
    getPerPage(): number;
    getCurrentPage(): number;
    getLasPage(): number;
    getFrom(): number;
    getTo(): number;
    getFirstUrl(): string;
    getLastUrl(): string;
    getNextUrl(): string | null;
    getPrevUrl(): string | null;
    getCurrentUrl(): string;
    getExist(): boolean;
    getOffset(): number;
    getLimit(): number;
}
