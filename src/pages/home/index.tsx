import React, { useState, useEffect } from "react";
import axios from "axios";
import { Article, UserPreferences } from "../../types/article";
import { getFormattedDate } from "../../lib/helpers";
import Header from "../../component/Header";
import DateInput from "../../component/forms/DateInput";
import SearchInput from "../../component/forms/SearchInput";
import ArticleCard from "./ArticleCard";
import SkeletonLoader from "../../component/SkeletonLoader";
import ErrorSpinner from "../../component/ErrorSpinner";
import NoArticles from "../../component/NoArticles";
import LoadingSpinner from "../../component/LoadingSpinner";
import PreferenceControl from "./PreferenceControl";

const NewsAggregator = () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const [isSaving, setIsSaving] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState({
    start: getFormattedDate(yesterday),
    end: getFormattedDate(today),
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    preferredSources: [],
    preferredCategories: [],
  });

  useEffect(() => {
    const initializeApp = async () => {
      const savedPreferences = localStorage.getItem("newsPreferences");
      if (savedPreferences) {
        const preferences = JSON.parse(savedPreferences);
        setUserPreferences(preferences);
        setSelectedSources(preferences.preferredSources);
        setSelectedCategories(preferences.preferredCategories);
      }
      await fetchArticles();
      setInitialLoading(false);
    };

    initializeApp();
  }, []);

  const savePreferences = async () => {
    setIsSaving(true);
    try {
      const preferences: UserPreferences = {
        preferredSources: selectedSources,
        preferredCategories: selectedCategories,
      };
      //I am trying to simulate a slight delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 600));
      localStorage.setItem("newsPreferences", JSON.stringify(preferences));
      setUserPreferences(preferences);
    } catch (error) {
      console.error("Error saving preferences:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const resetPreferences = async () => {
    setIsResetting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      localStorage.removeItem("newsPreferences");
      setSelectedSources([]);
      setSelectedCategories([]);
      setUserPreferences({
        preferredSources: [],
        preferredCategories: [],
      });
    } catch (error) {
      console.error("Error resetting preferences:", error);
    } finally {
      setIsResetting(false);
    }
  };

  const fetchArticles = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:5000/api/news", {
        //using this to avoid sharing multiple env for client and server
        params: {
          q: searchTerm || "general news",
          from: dateRange.start || undefined,
          to: dateRange.end || undefined,
          sources: userPreferences.preferredSources.join(",") || undefined,
          section: userPreferences.preferredCategories.join(",") || undefined,
        },
      });

      setArticles([
        ...response.data.newsapi,
        ...response.data.guardian,
        ...response.data.nyt,
      ]);
    } catch (err) {
      setError("Failed to fetch news articles. Please try again later.");
      console.error("Error fetching news:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const uniqueSources = [...new Set(articles.map((item) => item.source))];
  const uniqueCategory = [...new Set(articles.map((item) => item.category))];

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchArticles();
    }, 1500);

    return () => clearTimeout(timer);
  }, [searchTerm, dateRange, userPreferences]);

  const filteredArticles = articles.filter((article) => {
    const matchesSource =
      selectedSources.length === 0 || selectedSources.includes(article.source);
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(article.category);
    return matchesSource && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row relative">
            <aside
              className={`
                md:w-64 bg-white rounded-lg shadow
                ${isMobileMenuOpen ? "block" : "hidden md:block"}
                md:fixed md:top-24 md:h-[calc(100vh-6rem)] md:overflow-y-auto
              `}
            >
              <div className="p-4 space-y-6">
                <div>
                  <SearchInput
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                  />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Date Range</h3>
                  <div className="space-y-2">
                    <div>
                      <DateInput
                        label="From"
                        value={dateRange.start}
                        onChange={(e) =>
                          setDateRange((prev) => ({
                            ...prev,
                            start: e.target.value,
                          }))
                        }
                        max={dateRange.end}
                      />
                    </div>
                    <div>
                      <DateInput
                        label="To"
                        value={dateRange.end}
                        onChange={(e) =>
                          setDateRange((prev) => ({
                            ...prev,
                            end: e.target.value,
                          }))
                        }
                        min={dateRange.start}
                        max={getFormattedDate(new Date())}
                      />
                    </div>
                  </div>
                </div>

                {/* Preferences Controls */}
                <PreferenceControl
                  isSaving={isSaving}
                  isResetting={isResetting}
                  resetPreferences={resetPreferences}
                  savedPreferences={savePreferences}
                />
                {/* <div className="flex md:flex-col space-x-2 mb-4">
                  <div>
                    <button
                      disabled={selectedSources.length < 0}
                      onClick={savePreferences}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 md:w-full"
                    >
                      Save Preferences
                    </button>
                  </div>

                  <div className="md:pt-2">
                    <button
                      onClick={resetPreferences}
                      className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 w-full"
                    >
                      Reset
                    </button>
                  </div>
                </div> */}

                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <section>
                    {/* Sources */}
                    <div>
                      <h3 className="font-semibold mb-2">Sources</h3>
                      {uniqueSources.map((source) => (
                        <label key={source} className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={selectedSources.includes(source)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedSources([
                                  ...selectedSources,
                                  source,
                                ]);
                              } else {
                                setSelectedSources(
                                  selectedSources.filter((s) => s !== source)
                                );
                              }
                            }}
                          />
                          {source}
                        </label>
                      ))}
                    </div>

                    {/**Category */}
                    <div>
                      <h3 className="font-semibold mb-2">Category</h3>
                      {uniqueCategory.map((category) => (
                        <label
                          key={category}
                          className="flex items-center mb-2"
                        >
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={selectedCategories.includes(category)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedCategories([
                                  ...selectedCategories,
                                  category,
                                ]);
                              } else {
                                setSelectedCategories(
                                  selectedCategories.filter(
                                    (s) => s !== category
                                  )
                                );
                              }
                            }}
                          />
                          {category}
                        </label>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-72">
              {error && <ErrorSpinner error={error} />}
              {initialLoading ? (
                <SkeletonLoader />
              ) : isLoading ? (
                Array(4)
                  .fill(null)
                  .map((_, index) => <SkeletonLoader key={index} />)
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {filteredArticles.length > 0
                    ? filteredArticles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                      ))
                    : !isLoading && !error && <NoArticles />}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsAggregator;
