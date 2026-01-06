import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import MyFavouritesPanel from "../MyFavouritesPanel/MyFavouritesPanel";
import DisplayResults from "../DisplayResults/DisplayResults";
import Header from '../Header/Header'
import api from "../../api/news";
import axios from 'axios';

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
console.log('NEWSAPI', API_KEY); 

const Home = ({ page, keywords }) => {

    const [keyWord, setKeyword] = useState("Olympics");
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
    
      console.log("fetched News", news)
    
    const username = "James";

    

    const myFavourites = [
        {
          source: { id: 1, name: "BBC" },
          author: "Thomas Smith",
          title: "News about Olympics",
        },
        {
          source: { id: 2, name: "TechCrunch" },
          author: "Justin Lee",
          title: "Tech Innovations",
        },
        {
          source: { id: 3, name: "Healthline" },
          author: "Jasmine Brown",
          title: "Health and Wellness",
        },
        {
          source: { id: 4, name: "Al Jazeera" },
          author: "Smith Johnson",
          title: "Global Politics",
        },
        {
          source: { id: 5, name: "E! News" },
          author: "John D. Rock",
          title: "Entertainment Buzz",
        },
    ];
      
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
              wrap="nowrap"                 // ✅ prevent sidebar/main from wrapping
              sx={{ height: "100%" }}
            >
              {/* Sidebar */}
              <Grid
                item
                sx={{
                  width: { xs: "100%", lg: 320 },  // ✅ fixed width on large screens
                  flexShrink: 0,
                  height: "100%",
                  overflowY: "auto",
                }}
              >
                <MyFavouritesPanel
                  handleSetKeyword={setKeyword}
                  myFavourites={myFavourites}
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
                <DisplayResults keyWord={keyWord} news={news} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );      
}  

export default Home;