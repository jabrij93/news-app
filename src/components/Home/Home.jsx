import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import MyFavouritesPanel from "../MyFavouritesPanel/MyFavouritesPanel";
import DisplayResults from "../DisplayResults/DisplayResults";
import Header from '../Header/Header'
import api from "../../api/news";
import axios from 'axios';

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
console.log('NEWSAPI', API_KEY); 
const PAGE_SIZE = 10;

const Home = ({ page, keywords }) => {
    const [keyWord, setKeyword] = useState("Olympics");
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Track which page DisplayResults has currently loaded up to
    const [currentPage, setCurrentPage] = useState(1);

    // whether there might be more results
    const [hasMore, setHasMore] = useState(true);
    
    const fetchData = async (page, replace = false) => {
        try {
          setIsLoading(true);
    
          const response = await api.get("/everything", {
            params: {
              q: keyWord,
              page,
              pageSize: PAGE_SIZE,
              apiKey: API_KEY,
              sortBy: "publishedAt",
              language: "en",
              searchIn: "title",
            },
          });
    
          const newArticles = response?.data?.articles ?? [];
    
          if (replace) {
            setNews(newArticles);
          } else {
            setNews((prev) => [...prev, ...newArticles]);
          }
    
          if (newArticles.length < PAGE_SIZE) {
            setHasMore(false);
          }
        } catch (error) {
          console.error("News fetch failed:", error);
          setHasMore(false);
        } finally {
          setIsLoading(false);
        }
      };
      
      // initial load + when keyword changes
      useEffect(() => {
        setCurrentPage(1);
        setHasMore(true);
        fetchData(1, true);
      }, [keyWord]);
    
      const handleLoadMore = async () => {
        if (isLoading || !hasMore) return;
        const nextPage = currentPage + 1;
        await fetchData(nextPage);
        setCurrentPage(nextPage);
      };
    
    const username = "James";
      
    const handleSearch = () => {
    };

    const handleLogout = () => {
    };

    // Home.jsx (only the return part shown)
    return (
        <Grid
          container
          direction="column"
          className="home-container"
          sx={{ height: "100vh", overflow: "hidden" }}
        >
          {/* Header always visible */}
          <Grid item sx={{ flexShrink: 0 }}>
            <Header
              keyWord={keyWord}
              onKeywordChange={setKeyword}
              onSearch={handleSearch}
              onLogout={handleLogout}
              username={username}
            />
          </Grid>
      
          {/* Body fills remaining height */}
          <Grid item sx={{ flex: 1, minHeight: 0 }}>
            <Grid
              container
              wrap="nowrap"                 
              sx={{ height: "100%" }}
            >
              {/* Sidebar */}
              <Grid
                item
                sx={{
                  width: { xs: "100%", lg: 320 }, 
                  flexShrink: 0,
                  height: "100%",
                  overflowY: "auto",
                }}
              >
                <MyFavouritesPanel
                  handleSetKeyword={setKeyword}
                  myFavourites={news}
                  clearmyFavourites={() => {}}
                />
              </Grid>
      
              {/* Main results */}
              <Grid
                item
                sx={{
                  flex: 1,
                  minWidth: 0,               // ✅ IMPORTANT: allows content to shrink
                  height: "100%",
                  overflowY: "auto",         // ✅ scroll happens here
                  padding: 2,
                }}
              >
                <DisplayResults 
                    keyWord={keyWord}
                    news={news}
                    isLoading={isLoading}
                    hasMore={hasMore}
                    onLoadMore={handleLoadMore}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );      
}  

export default Home;