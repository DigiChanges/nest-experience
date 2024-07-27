
export interface PaginatorTransformerResponse
{
    total: number;
    offset: number;
    limit: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
    from: number;
    to: number;
    firstUrl: string;
    lastUrl: string;
    nextUrl: string;
    prevUrl: string;
    currentUrl: string;
}
