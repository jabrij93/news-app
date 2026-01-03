import React, { useEffect, useState } from "react";
import { Grid, Button, LinearProgress, Box } from "@mui/material";
import NewsItem from "../NewsItem/NewsItem";

// IMPORTANT: set your API key somewhere safe (env var recommended)
const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

// You can tweak this if you want
const PAGE_SIZE = 20;

export default function DisplayResults(props) {
  const { keyWord, page, news: initialNews, updateMyFavourites } = props;

  // Required state vars
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Track which page DisplayResults has currently loaded up to
  const [currentPage, setCurrentPage] = useState(page || 1);

  // 1) Whenever parent sends NEW search results, replace local list
  //    (This happens after user clicks Search and Home fetches page 1)
  useEffect(() => {
    if (Array.isArray(initialNews)) {
      setNews(initialNews);
      setCurrentPage(page || 1);
    }
  }, [initialNews, page]);

  // 2) If the keyword changes, you typically want to reset UI state
  //    (Home will also usually send new initialNews, but this keeps it robust)
  useEffect(() => {
    setCurrentPage(page || 1);
  }, [keyWord, page]);

  const fetchMore = async () => {
    if (!keyWord) return;

    const nextPage = currentPage + 1;

    try {
      setIsLoading(true);

      // Example endpoint. Adjust to match your exact NewsAPI plan/endpoint.
      // - "everything" is common for keyword searches.
      const url =
        `https://newsapi.org/v2/everything` +
        `?q=${encodeURIComponent(keyWord)}` +
        `&pageSize=${PAGE_SIZE}` +
        `&page=${nextPage}` +
        `&apiKey=${API_KEY}`;

      const res = await fetch(url);
      const data = await res.json();

      // NewsAPI returns articles in data.articles
      const moreArticles = Array.isArray(data.articles) ? data.articles : [];

      // Append to existing results
      setNews((prev) => [...prev, ...moreArticles]);
      setCurrentPage(nextPage);
    } catch (err) {
      console.error("Load more failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {isLoading && <LinearProgress />}

      <Grid container spacing={2} sx={{ mt: 1 }}>
        {news.map((article, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={article.url || idx}>
            <NewsItem newsObject={article} updateMyFavourites={updateMyFavourites} />
          </Grid>
        ))}
      </Grid>

      {/* Load More */}
      <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
        <Button
          variant="contained"
          onClick={fetchMore}
          disabled={isLoading || !keyWord}
        >
          Load More
        </Button>
      </Box>
    </Box>
  );
}
