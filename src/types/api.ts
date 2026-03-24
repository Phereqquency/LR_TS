export interface Source {
    id: string;
    name: string;
    description?: string;
    url?: string;
    category?: string;
    language?: string;
    country?: string;
}

export interface Article {
    source: {
        id: string | null;
        name: string;
    };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface SourcesResponse {
    status: string;
    sources: Source[];
}

export interface EverythingResponse {
    status: string;
    totalResults: number;
    articles: Article[];
}

export type ApiResponse = SourcesResponse | EverythingResponse;

export interface RequestParams {
    endpoint: 'sources' | 'everything';
    options?: Record<string, string | number | boolean>;
}

export interface LoaderOptions {
    apiKey: string;
}