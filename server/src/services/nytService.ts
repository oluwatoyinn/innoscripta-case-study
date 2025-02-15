import axios from "axios";
import { NewsProvider } from "../interfaces/NewsProvider";
import { Article, NewsQueryParams } from "../types/news";

export class NYTimesNewsProvider implements NewsProvider {
  private readonly apiKey: string;
  private readonly baseUrl =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async fetchArticles(params: NewsQueryParams): Promise<Article[]> {
    const response = await axios.get(this.baseUrl, {
      params: {
        "api-key": this.apiKey,
        q: params.q,
        begin_date: params.from?.replace(/-/g, ""),
        end_date: params.to?.replace(/-/g, ""),
        section_name: params.category,
      },
    });

    return response.data.response.docs.map(this.mapToArticle);
  }

  private mapToArticle(article: any): Article {
    return {
      id: article._id,
      title: article.headline.main,
      description: article.snippet || "",
      source: "New York Times",
      author: article.byline.original || "Unknown",
      category: article.section_name || "General",
      date: new Date(article.pub_date).toISOString().split("T")[0],
      imageUrl:
        "https://placehold.co/600x400?text=Image+Not+Available&font=oswald",
      url: article.web_url,
    };
  }
}
