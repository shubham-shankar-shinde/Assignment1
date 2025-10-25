import React, { useEffect, useState } from "react";
import NewsCard from "./components/NewsCard";
import SearchBar from "./components/SearchBar";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const App = () => {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("latest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${query}&pageSize=2&apiKey=${API_KEY}`
      );
      const data = await response.json();
      setArticles(data.articles || []);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow p-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-center text-blue-600">
          📰 News Feed App
        </h1>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <SearchBar onSearch={setQuery} />

        {loading && <p className="text-center mt-8">Loading...</p>}
        {error && (
          <p className="text-center text-red-500 mt-8">
            Something went wrong. Try again later.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          {!loading && !error && articles.length > 0
            ? articles.map((article, idx) => (
                <NewsCard key={idx} article={article} />
              ))
            : !loading && (
                <p className="text-center col-span-2">No articles found.</p>
              )}
        </div>
      </main>
    </div>
  );
};

export default App;
