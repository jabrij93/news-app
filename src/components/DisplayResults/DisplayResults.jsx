import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Button, LinearProgress, Box } from "@mui/material";
import NewsItem from "../NewsItem/NewsItem";
import api from "../../api/news";

// You can tweak this if you want
const PAGE_SIZE = 20;

export default function DisplayResults(props) {
  const { keyWord, page, updateMyFavourites, news } = props;

  // Required state vars
  const [isLoading, setIsLoading] = useState(false);

  // Track which page DisplayResults has currently loaded up to
  const [currentPage, setCurrentPage] = useState(page || 1);

  return (
    <Box sx={{ width: "100%" }}>
      {isLoading && <LinearProgress />}

      <Grid container spacing={2} alignItems="stretch" justifyContent="space-evenly">
        {news.map((article, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={article.url || idx} sx={{ display: "flex" }}>
            <NewsItem news={article} updateMyFavourites={updateMyFavourites} />
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
