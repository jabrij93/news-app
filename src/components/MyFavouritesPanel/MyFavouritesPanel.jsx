// src/components/MyFavouritesPanel/MyFavouritesPanel.jsx
import { useEffect, useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

const STORAGE_KEY = "myFavourites";

const MyFavouritesPanel = ({
  handleSetKeyword,
  myFavourites,
  clearmyFavourites,
}) => {
  // If parent doesn't pass myFavourites yet, we can still render from localStorage.
  const [localFavs, setLocalFavs] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      setLocalFavs(Array.isArray(parsed) ? parsed : []);
    } catch (e) {
      setLocalFavs([]);
    }
  }, []);

  // Prefer parent state if provided; otherwise fallback to localStorage.
  const favourites = useMemo(() => {
    return Array.isArray(myFavourites) ? myFavourites : localFavs;
  }, [myFavourites, localFavs]);

  const count = favourites?.length ?? 0;

  const handleClear = () => {
    // Clear localStorage (source of truth for persistence)
    localStorage.removeItem(STORAGE_KEY);
    setLocalFavs([]);

    // Also tell parent to clear if it manages state
    if (typeof clearmyFavourites === "function") {
      clearmyFavourites();
    }
  };

  const handlePickFavourite = (fav) => {
    // Choose what should become the new keyword when clicking a favourite:
    // - prefer fav.keyword if you store it
    // - else try title/source name
    const nextKeyword =
      fav?.keyword ||
      fav?.title ||
      fav?.source?.name ||
      fav?.author ||
      "";

    if (typeof handleSetKeyword === "function" && nextKeyword) {
      handleSetKeyword(nextKeyword);
    }
  };

  return (
    <Grid
      container
      direction="column"
      sx={{
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.35)",
        borderRadius: 1,
        overflow: "hidden",
      }}
    >
      {/* Header row: "My Favourites: X" + Clear button */}
      <Grid
        item
        sx={{
          px: 2,
          py: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "rgba(0,0,0,0.25)",
        }}
      >
        <Typography variant="subtitle1" sx={{ color: "#fff" }}>
          My Favourites: {count}
        </Typography>

        <Button
          variant="contained"
          size="small"
          onClick={handleClear}
          disabled={count === 0}
          sx={{ textTransform: "none" }}
        >
          Clear
        </Button>
      </Grid>

      <Divider />

      {/* Scrollable list */}
      <Grid item sx={{ flex: 1, minHeight: 0 }}>
        <Box sx={{ height: "100%", overflowY: "auto" }}>
          {count === 0 ? (
            <Typography
              variant="body2"
              sx={{ color: "rgba(255,255,255,0.8)", p: 2 }}
            >
              No favourites yet.
            </Typography>
          ) : (
            <List disablePadding>
              {favourites.map((fav, idx) => {
                const title = fav?.title || "Untitled";
                const secondary =
                  fav?.source?.name ||
                  fav?.author ||
                  (fav?.publishedAt ? String(fav.publishedAt) : "");

                return (
                  <Box key={fav?.url || `${title}-${idx}`}>
                    <ListItemButton onClick={() => handlePickFavourite(fav)}>
                      <ListItemText
                        primary={title}
                        secondary={secondary}
                        primaryTypographyProps={{
                          sx: {
                            color: "#fff",
                            fontSize: "0.95rem",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          },
                        }}
                        secondaryTypographyProps={{
                          sx: {
                            color: "rgba(255,255,255,0.75)",
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          },
                        }}
                      />
                    </ListItemButton>
                    <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />
                  </Box>
                );
              })}
            </List>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default MyFavouritesPanel;
