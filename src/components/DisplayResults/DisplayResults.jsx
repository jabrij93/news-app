import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Button, LinearProgress, Box } from "@mui/material";
import NewsItem from "../NewsItem/NewsItem";
import api from "../../api/news";

const TOTAL_NEWS = 10;

export default function DisplayResults(props) {
  const { keyWord, page, updateMyFavourites, news = [] } = props;

  // Required state vars
  const [isLoading, setIsLoading] = useState(false);

  // show only 10 news initially
  const [visibleNews, setVisibleNews] = useState(TOTAL_NEWS);

  // reset back to 10 whenever a new search result comes in
  useEffect(() => {
    setVisibleNews(TOTAL_NEWS);
  }, [keyWord, news]);

  const displayedNews = news.slice(0, visibleNews);
  const hasMoreToShow = visibleNews < news.length;

  return (
    <Box sx={{ width: "100%" }}>
      {isLoading && <LinearProgress />}

      <Grid container spacing={2} alignItems="stretch" justifyContent="space-evenly">
        {displayedNews.map((article, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={article.url || idx} sx={{ display: "flex" }}>
            <NewsItem news={article} updateMyFavourites={updateMyFavourites} />
          </Grid>
        ))}
      </Grid>

      {hasMoreToShow && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            variant="contained"
            onClick={() =>
              setVisibleNews((c) => Math.min(c + TOTAL_NEWS, news.length))
            }
          >
            Load More
          </Button>
        </Box>
      )}
    </Box>
  );
}
