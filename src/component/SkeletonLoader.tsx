import React from 'react';

const SkeletonLoader = () => {
  return (
    <article className="bg-white rounded-lg shadow overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-48 bg-gray-200" />
      
      <div className="p-4">
        {/* Source and date row */}
        <div className="flex justify-between items-center mb-2">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-20 bg-gray-200 rounded" />
        </div>
        
        {/* Title skeleton */}
        <div className="space-y-2 mb-2">
          <div className="h-6 w-3/4 bg-gray-200 rounded" />
          <div className="h-6 w-1/2 bg-gray-200 rounded" />
        </div>
        
        {/* Description skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-2/3 bg-gray-200 rounded" />
        </div>
        
        {/* Author and Read More row */}
        <div className="flex justify-between items-center">
          <div className="h-4 w-32 bg-gray-200 rounded" />
          <div className="h-4 w-20 bg-gray-200 rounded" />
        </div>
      </div>
    </article>
  );
};

export default SkeletonLoader;
