import { NewsProvider } from "../interfaces/NewsProvider";
import { NewsApiResponse, NewsQueryParams } from "../types/news";

export class NewsAggregator {
  private providers: NewsProvider[];

  constructor(providers: NewsProvider[]) {
    this.providers = providers;
  }

  async fetchAllNews(params: NewsQueryParams): Promise<NewsApiResponse> {
    try {
      const [guardian, nyt, newsapi] = await Promise.all(
        this.providers.map((provider) => provider.fetchArticles(params))
      );

      return { newsapi, guardian, nyt };
    } catch (error) {
      throw new Error(`Failed to fetch news: ${(error as Error).message}`);
    }
  }
}