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

    return (
        <Grid container className="home-container" direction={"column"}>
            <Grid className="header-container" item xs={12} sx={{ height: "10vh" }}>
                <Header
                    keyword={keyword}
                    onKeywordChange={setKeyword}
                    onSearch={handleSearch}
                    onLogout={handleLogout}
                    username={username}     
                />    
            </Grid>
            <Grid className="content-container" item lg={11}>
                <Grid container direction="row" style={{ height: "100%"}}>
                    <Grid className="left-panel-container" item lg="2.5">
                        <MyFavouritesPanel style={{ overflowY: "scroll"}}
                           
                        ></MyFavouritesPanel>
                    </Grid>
                    <Grid className="result-container" item lg="9.5">
                        <DisplayResults ></DisplayResults>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

console.log(Header);  // Should log function, not undefined


export default Home;