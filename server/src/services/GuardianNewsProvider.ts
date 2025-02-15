import axios from "axios";
import { NewsProvider } from "../interfaces/NewsProvider";
import { Article, NewsQueryParams } from "../types/news";

export class GuardianNewsProvider implements NewsProvider {
  private readonly apiKey: string;
  private readonly baseUrl = "https://content.guardianapis.com/search";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async fetchArticles(params: NewsQueryParams): Promise<Article[]> {
    const response = await axios.get(this.baseUrl, {
      params: {
        "api-key": this.apiKey,
        q: params.q,
        from_date: params.from?.replace(/-/g, ""),
        to_date: params.to?.replace(/-/g, ""),
      },
    });

    return response.data.response.results.map(this.mapToArticle);
  }

  private mapToArticle(article: any): Article {
    return {
      id: article.id,
      title: article.webTitle,
      description: article.webTitle || "",
      source: "The Guardian",
      author: article.fields?.byline || "Unknown",
      category: article.sectionName,
      date: new Date(article.webPublicationDate).toISOString().split("T")[0],
      imageUrl:
        article.fields?.thumbnail ||
        "https://placehold.co/600x400?text=Image+Not+Available&font=oswald",
      url: article.webUrl,
    };
  }
}
