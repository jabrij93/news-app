import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Button, LinearProgress, Box } from "@mui/material";
import NewsItem from "../NewsItem/NewsItem";

const CHUNK_SIZE = 10;

export default function DisplayResults(props) {
  const { keyWord, news = [], updateMyFavourites, isLoading, hasMore, onLoadMore } = props;

  const [visibleCount, setVisibleCount] = useState(CHUNK_SIZE);

  // reset shown count when keyword changes / new search results
  useEffect(() => {
    setVisibleCount(CHUNK_SIZE);
  }, [keyWord]);

  // if new items were appended, auto-expand to include them (optional but nice)
  useEffect(() => {
    setVisibleCount((c) => Math.min(Math.max(c, CHUNK_SIZE), news.length));
  }, [news.length]);

  const handleClick = async () => {
    // reveal hidden already-fetched items first
    if (visibleCount < news.length) {
      setVisibleCount((c) => Math.min(c + CHUNK_SIZE, news.length));
      return;
    }

    // otherwise fetch next page
    if (hasMore && onLoadMore) {
      await onLoadMore();
      // after load, we’ll reveal the next chunk when news updates
      setVisibleCount((c) => c + CHUNK_SIZE);
    }
  };

  const visibleNews = news.slice(0, visibleCount);

  // show button if: there are hidden items OR API has more
  const showButton = visibleCount < news.length || hasMore;

  console.log("DisplayResults:", {
    newsLen: news.length,
    visibleCount,
    hasMore,
    isLoading,
    showButton: (visibleCount < news.length || hasMore),
  });
  

  return (
    <Box sx={{ width: "100%" }}>
      {isLoading && <LinearProgress />}

      <Grid container spacing={2} alignItems="stretch" justifyContent="space-evenly">
        {visibleNews.map((article, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={article.url || idx} sx={{ display: "flex" }}>
            <NewsItem news={article} updateMyFavourites={updateMyFavourites} />
          </Grid>
        ))}
      </Grid>

      {showButton && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button variant="contained" onClick={handleClick} disabled={isLoading}>
            {isLoading ? "Loading..." : "Load More"}
          </Button>
        </Box>
      )}
    </Box>
  );
}
