import React, { useEffect, useState } from "react";
import { Grid, Button, LinearProgress, Box } from "@mui/material";
import NewsItem from "../NewsItem/NewsItem";

// IMPORTANT: set your API key somewhere safe (env var recommended)
const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
console.log('NEWSAPI', API_KEY);
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
  
    console.log("fetchMore clicked", { keyWord, currentPage });
  
    const nextPage = currentPage + 1;
  
    try {
      setIsLoading(true);
  
      const url =
        `${API_KEY}` +
        `&q=${encodeURIComponent(keyWord)}` +
        `&pageSize=${PAGE_SIZE}` +
        `&page=${nextPage}`;
  
      console.log("Fetching URL:", url);
  
      const res = await fetch(url);
      console.log("Response status:", res.status);
  
      const data = await res.json();
      console.log("Fetch more data:", data);
  
      const moreArticles = Array.isArray(data.articles) ? data.articles : [];
      setNews((prev) => [...prev, ...moreArticles]);
      setCurrentPage(nextPage);
    } catch (err) {
      console.error("Load more failed:", err);
    } finally {
      setIsLoading(false);
    }
  };
  
  console.log("render DisplayResults", { keyWord, isLoading, currentPage });

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
      <Button
        variant="contained"
        onClick={() => {
          console.log("Load More button clicked");
          fetchMore();
        }}
      >
        Load More
      </Button>
    </Box>
  );
}
