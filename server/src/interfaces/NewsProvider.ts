import { Article, NewsQueryParams } from "../types/news";

export interface NewsProvider {
  fetchArticles(params: NewsQueryParams): Promise<Article[]>;
}
