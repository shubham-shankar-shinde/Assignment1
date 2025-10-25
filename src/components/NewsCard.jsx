import React from "react";

const NewsCard = ({ article }) => {
  const { title, description, url, urlToImage, source } = article;

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col">
      <img
        src={urlToImage || "https://via.placeholder.com/400x200?text=No+Image"}
        alt={title}
        className="rounded-md object-cover w-full h-48 mb-3"
      />
      <h2 className="font-semibold text-lg mb-2">{title}</h2>
      <p className="text-sm text-gray-600 flex-grow">{description}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 text-blue-600 hover:underline text-sm"
      >
        Read more at {source?.name || "Source"}
      </a>
    </div>
  );
};

export default NewsCard;
