import axios from "axios";
import { NewsProvider } from "../interfaces/NewsProvider";
import { Article, NewsQueryParams } from "../types/news";

export class NewsAPIProvider implements NewsProvider {
  private readonly apiKey: string;
  private readonly baseUrl = "https://newsapi.org/v2/everything?pageSize=10";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async fetchArticles(params: NewsQueryParams): Promise<Article[]> {
    const response = await axios.get(this.baseUrl, {
      params: {
        apiKey: this.apiKey,
        ...params,
      },
    });

    return response.data.articles.map(this.mapToArticle);
  }

  private mapToArticle(article: any): Article {
    return {
      id: article.url,
      title: article.title,
      description: article.description || "",
      source: "News API",
      author: article.author || "Unknown",
      category: article.category || "General",
      date: new Date(article.publishedAt).toISOString().split("T")[0],
      imageUrl:
        article.urlToImage ||
        "https://placehold.co/600x400?text=Image+Not+Available&font=oswald",
      url: article.url,
    };
  }
}
