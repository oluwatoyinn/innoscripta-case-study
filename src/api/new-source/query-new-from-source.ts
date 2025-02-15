// /* eslint-disable @typescript-eslint/no-explicit-any */
// import config from "../../@config";
// import { APIConfig, Article } from "../../types/article";

// export const API_CONFIG = {
//   guardian: {
//     baseUrl: config.guardianBaseUrl,
//     apiKey: config.guardianApiKey,
//   },
//   newsApi: {
//     baseUrl: config.newApiBaseUrl,
//     apiKey: config.newApiKey,
//   },
//   newYorkApi: {
//     baseUrl: config.newYorkBaseUrl,
//     apiKey: config.newYorkApiKey,
//   },
// };

// // news-service.ts
// export class QueryNewsService {
//   private async fetchWithConfig(
//     url: string,
//     config: APIConfig
//   ): Promise<Response> {
//     return fetch(`${config.baseUrl}${url}`, {
//       headers: {
//         Authorization: `Bearer ${config.apiKey}`,
//         "Content-Type": "application/json",
//       },
//     });
//   }

//   async getGuardianNews(
//     query: string = "",
//     fromDate: string = "",
//     toDate: string = ""
//     // section: string = ""
//   ): Promise<Article[]> {
//     try {
//       const params = new URLSearchParams({
//         q: query,
//         "from-date": fromDate,
//         "to-date": toDate,
//         "api-key": config.guardianApiKey,
//         // section: section,
//         // "show-fields": "all",
//       });

//       const response = await this.fetchWithConfig(
//         `/search?${params}`,
//         API_CONFIG.guardian
//       );
//       const data = await response.json();
//       console.log({ data });

//       const articles = data.response.results.map((article: any) => ({
//         id: article.id,
//         title: article.webTitle,
//         // description: article.fields?.bodyText?.substring(0, 200) || '',
//         description: article.webTitle || "",
//         source: "The Guardian",
//         author: article.fields?.byline || "Unknown",
//         category: article.sectionName,
//         date: new Date(article.webPublicationDate).toISOString().split("T")[0],
//         imageUrl: article.fields?.thumbnail || "https://placehold.co/600x400?text=Image+Not+Available&font=oswald",
//         url: article.webUrl,
//       }));

//       return articles;
//     } catch (error) {
//       console.error("Error fetching Guardian news:", error);
//       return [];
//     }
//   }

//   async getNewYorkTimeNews(
//     query: string = "",
//     fromDate: string = "",
//     toDate: string = "",
//     section: string = ""
//   ): Promise<Article[]> {
//     try {
//       const params = new URLSearchParams({
//         q: query,
//         begin_date: fromDate,
//         end_date: toDate,
//         section_name: section,
//         "api-key": config.newYorkApiKey,
//       });

//       const response = await this.fetchWithConfig(
//         `/articlesearch.json?${params}`,
//         API_CONFIG.newYorkApi
//       );
//       const data = await response.json();
//       console.log("newYorkArticles", data);

//       const articles = data.response.results.map((article: any) => ({
//         id: article.id,
//         title: article.webTitle,
//         // description: article.fields?.bodyText?.substring(0, 200) || '',
//         description: article.webTitle || "",
//         source: "The Guardian",
//         author: article.fields?.byline || "Unknown",
//         category: article.sectionName,
//         date: new Date(article.webPublicationDate).toISOString().split("T")[0],
//         imageUrl: article.fields?.thumbnail || "https://placehold.co/600x400?text=Image+Not+Available&font=oswald",
//         url: article.webUrl,
//       }));

//       return articles;
//     } catch (error) {
//       console.error("Error fetching Guardian news:", error);
//       return [];
//     }
//   }

//   async getNewsApiArticles(
//     query: string = "",
//     fromDate: string = "",
//     toDate: string = "",
//     category: string = ""
//   ): Promise<Article[]> {
//     try {
//       const params = new URLSearchParams({
//         q: query,
//         from: fromDate,
//         to: toDate,
//         category: category,
//         language: "en",
//         apiKey: config.newApiKey,
//       });

//       const response = await this.fetchWithConfig(
//         `/everything?${params}`,
//         API_CONFIG.newsApi
//       );
//       const data = await response.json();
//       return data.articles.map((article: any) => ({
//         id: article.url,
//         title: article.title,
//         description: article.description || "",
//         source: article.source.name,
//         author: article.author || "Unknown",
//         category: category || "General",
//         date: new Date(article.publishedAt).toISOString().split("T")[0],
//         imageUrl: article.urlToImage || "https://placehold.co/600x400?text=Image+Not+Available&font=oswald",
//         url: article.url,
//       }));
//     } catch (error) {
//       console.error("Error fetching NewsAPI articles:", error);
//       return [];
//     }
//   }

//   async getAllNews(
//     query: string = "",
//     fromDate: string = "",
//     toDate: string = "",
//     category: string = ""
//   ): Promise<Article[]> {
//     try {
//       const [guardianNews, newsApiArticles, newYorkTimesArticles] =
//         await Promise.all([
//           this.getGuardianNews(query, fromDate, toDate, category),
//           this.getNewsApiArticles(query, fromDate, toDate, category),
//           this.getNewYorkTimeNews(query, fromDate, toDate, category),
//         ]);

//       return [...guardianNews, ...newsApiArticles, ...newYorkTimesArticles];
//     } catch (error) {
//       console.error("Error fetching all news:", error);
//       return [];
//     }
//   }
// }
