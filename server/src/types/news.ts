import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";

export interface Article {
  id: string;
  title: string;
  description: string;
  source: string;
  author: string;
  category: string;
  date: string;
  imageUrl: string;
  url: string;
}

export interface NewsQueryParams {
  q?: string;
  from?: string;
  to?: string;
  category?: string;
}

export interface NewsApiResponse {
  guardian: Article[];
  nyt: Article[];
  newsapi: Article[];
}

export interface TypedRequest extends ExpressRequest {
  query: {
    q?: string;
    from?: string;
    to?: string;
    category?: string;
  };
}

export interface TypedRequest<T = Record<string, unknown>>
  extends ExpressRequest {
  query: NewsQueryParams;
}

export interface NewsQueryRequest
  extends TypedRequest<{
    q?: string;
    from?: string;
    to?: string;
    category?: string;
  }> {}
