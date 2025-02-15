/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import config from "../../@config";
import { truncateText } from "../../lib/helpers";

const ArticleCard = ({ article }: any) => {
  const articleAuthorLength = config.articleAuthorLength;
  const articleDescriptionLength = config.articleDescriptionLength;

  return (
    <article className="bg-white rounded-lg shadow overflow-hidden">
      <img
        src={article.imageUrl}
        alt={article.title}
        className="w-full h-48 object-cover"
         loading="lazy"
      />
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-blue-600">{article.source}</span>
          <span className="text-sm text-gray-500">{article.date}</span>
        </div>
        <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
        <p className="text-gray-600 mb-4">
          {truncateText(article.description, articleDescriptionLength)}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {truncateText(article.author, articleAuthorLength)}
          </span>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            Read More
          </a>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
