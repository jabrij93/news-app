import { useState } from "react";
import Grid from "@mui/material/Grid";
import MyFavouritesPanel from "../MyFavouritesPanel/MyFavouritesPanel";
import DisplayResults from "../DisplayResults/DisplayResults";
import Header from '../Header/Header'

const Home = () => {
    const [keyword, setKeyword] = useState("Olympics");
    const username = "James";

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
              myFavourites={[]}               // later you’ll pass state
              clearmyFavourites={() => {}}     // later you’ll pass real handler
            />
          </Grid>
  
          <Grid item xs={12} lg={9} sx={{ height: "100%" }}>
            <DisplayResults />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}  

export default Home;