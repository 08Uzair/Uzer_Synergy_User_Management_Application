import React from 'react';

const Loader = () => {
  return (
    <div className=' backCss'>
    <div
      role="status"
      className="   divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6"
    >
      {Array.from({ length: 9 }).map((_, index) => (
        <div className="flex items-center justify-between pt-4" key={index}>
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32 mb-2.5"></div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-96 mb-2.5"></div>
            <div className="skeletonCss h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
      ))}
      <span className="sr-only">Loading...</span>
    </div>
    </div>
  );
};

export default Loader;
