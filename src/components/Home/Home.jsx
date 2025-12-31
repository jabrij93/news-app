import Grid from "@mui/material/Grid";
import MyFavouritesPanel from "../MyFavouritePanel/MyFavouritePanel";

const Home = () => {
    return (
        <Grid container className="home-container" direction={"column"}>
            <Grid className="header-container" item lg={1} style={{maxheight: "10vh"}}> </Grid>
            <Grid className="content-container" item lg={11}>
                <Grid container direction="row" style={{ height: "100%"}}>
                    <Grid className="left-panel-container" item lg="2.5">
                        <MyFavouritesPanel style={{ overflowY: "scroll"}}
                            handleSetKeyword={handleSetKeyword}
                            myFavourites={myFavourites}
                            clearmyFavourites={clearmyFavourites}
                        ></MyFavouritesPanel>
                    </Grid>
                    <Grid className="result-container" item lg="9.5">
                        <DisplayResults keyWord={keyWord} updatemyFavourites={updatemyFavourites}></DisplayResults>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Home;