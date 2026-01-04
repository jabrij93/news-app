import React, { useEffect, useState } from "react";
import { Grid, Button, LinearProgress, Box } from "@mui/material";
import NewsItem from "../NewsItem/NewsItem";
import api from "../../api/news";

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

  const fetchData = async () => {
    try {
      setIsLoading(true);
  
      const response = await api.get("/everything", {
        params: {
          q: keyWord,
          page: currentPage,
          pageSize: 20,
          apiKey: API_KEY,
          sortBy: "publishedAt",
          language: "en",
          searchIn: "title",
        },
      });
  
      setNews(response.data.articles);
    } catch (error) {
      console.error("News fetch failed:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  console.log('test fetch News', news);

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
        }}
      >
        Load More
      </Button>
    </Box>
  );
}
