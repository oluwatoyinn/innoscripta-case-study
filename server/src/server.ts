import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { NewsAggregator } from "./services/newsAggregator";
// import { GuardianNewsProvider } from './services/guardianService';
import { NYTimesNewsProvider } from "./services/nytService";
import { NewsAPIProvider } from "./services/newsApiService";
import { NewsQueryRequest, NewsApiResponse } from "./types/news";
import { GuardianNewsProvider } from "./services/GuardianNewsProvider";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const newsAggregator = new NewsAggregator([
  new GuardianNewsProvider(process.env.GUARDIAN_API_KEY || ""),
  new NYTimesNewsProvider(process.env.NYTIMES_API_KEY || ""),
  new NewsAPIProvider(process.env.NEWSAPI_API_KEY || ""),
]);

// Error handler middleware
const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error fetching news:", error);
  res.status(500).json({
    message: "Error fetching news",
    error: error.message,
  });
};

app.get(
  "/api/news",
  async (req: NewsQueryRequest, res: Response, next: NextFunction) => {
    try {
      const params = {
        q: req.query.q,
        from: req.query.from,
        to: req.query.to,
        category: req.query.category,
      };

      const result = await newsAggregator.fetchAllNews(params);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
