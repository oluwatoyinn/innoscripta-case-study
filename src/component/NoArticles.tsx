import { NewspaperIcon } from "lucide-react";
import React from "react";

const NoArticles = () => {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-sm">
      <NewspaperIcon className="w-16 h-16 text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No articles found
      </h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">
        We couldn&apos;t find any articles matching your current filters. Try
        adjusting your search criteria or preferences.
      </p>
    </div>
  );
};

export default NoArticles;
