import { useState } from "react";
import Grid from "@mui/material/Grid";
import MyFavouritesPanel from "../MyFavouritesPanel/MyFavouritesPanel";
import DisplayResults from "../DisplayResults/DisplayResults";
import Header from '../Header/Header'
import axios from 'axios';

const Home = () => {
    const [keyword, setKeyword] = useState("Olympics");
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
    <Grid container className="home-container" direction="column" sx={{ height: "100vh" }}>
      <Grid item xs={12} sx={{ height: "10vh" }}>
        <Header
          keyword={keyword}
          onKeywordChange={setKeyword}
          onSearch={handleSearch}
          onLogout={handleLogout}
          username={username}
        />
      </Grid>
  
      <Grid item xs sx={{ height: "90vh" }}>
        <Grid container sx={{ height: "100%" }}>
          <Grid item xs={12} lg={3} sx={{ height: "100%" }}>
            <MyFavouritesPanel
              handleSetKeyword={setKeyword}
              myFavourites={myFavourites}            
              clearmyFavourites={() => {}}     
            />
          </Grid>
  
          <Grid item xs={12} lg={9} sx={{ height: "100%" }}>
          <DisplayResults
            keyword={keyword}
          />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}  

export default Home;