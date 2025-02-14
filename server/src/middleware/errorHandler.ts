import { Response } from 'express';
import { NewsQueryRequest } from '../types/news';

export const errorHandler = (error: Error, req: NewsQueryRequest, res: Response) => {
  console.error('Error fetching news:', error);
  res.status(500).json({
    message: 'Error fetching news',
    error: error.message
  });
};