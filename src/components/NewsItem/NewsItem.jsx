import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

function safeParseArray(value) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function formatPublishedAt(publishedAt) {
  if (!publishedAt) return "";
  
  const d = new Date(publishedAt);
  if (Number.isNaN(d.getTime())) return publishedAt;
  return d.toLocaleString();
}

export default function NewsItem({ news, updateMyFavourites }) {
  const sourceName = news?.source?.name || "Unknown Source";
  const publishedTime = formatPublishedAt(news?.publishedAt);
  const title = news?.title || "";
  const imageUrl = news?.urlToImage || "";
  const articleUrl = news?.url || "";

  const openArticle = () => {
    if (!articleUrl) return;
    window.open(articleUrl, "_blank", "noopener,noreferrer");
  };

  const addToFavourites = (e) => {
    // prevent card click from also opening the article
    e.stopPropagation();
    e.preventDefault();

    // Build a clean object to store (keep what you need)
    const fav = {
      source: { name: sourceName },
      publishedAt: news?.publishedAt || "",
      title,
      urlToImage: imageUrl,
      url: articleUrl,
    };

    const existing = safeParseArray(localStorage.getItem("favourites"));

    // avoid duplicates (url is the best unique key from NewsAPI)
    const alreadyExists = existing.some((x) => x?.url && x.url === fav.url);
    const updated = alreadyExists ? existing : [fav, ...existing];

    localStorage.setItem("favourites", JSON.stringify(updated));

    // refresh left panel
    if (typeof updateMyFavourites === "function") updateMyFavourites();
  };

  return (
    <Card
        sx={{
            height: 340,              // ✅ fixed card height (tweak this)
            display: "flex",
            flexDirection: "column",
            position: "relative",
            width: 200,
        }}
    >
      <CardActionArea
        onClick={openArticle}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          flexGrow: 1,
          minWidth: 0, 
        }}
      >
        {imageUrl ? (
        <CardContent sx={{ flex: 1, minWidth: 0, overflow: "hidden", pb: 5 }}>  
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {sourceName}
          </Typography>
  
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            sx={{ mb: 1 }}
          >
            {publishedTime}
          </Typography>  

          <CardMedia
            component="img"
            image={imageUrl}
            alt={title}
            sx={{ height: 180, flexShrink: 0, objectFit: "cover" }}  // ✅ fixed
          />
        </CardContent>        
        ) : (
          <Box
            sx={{
              height: 180,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "grey.200",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              No Image
            </Typography>
          </Box>
        )}
  
        <CardContent sx={{ height:110, minWidth: 0, overflow: "hidden", pb: 5 }}>
          <Typography variant="body2" sx={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
          }}>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
  
      {/* ✅ OUTSIDE CardActionArea */}
      <IconButton
        onClick={addToFavourites}
        aria-label="Add to favourites"
        sx={{
          position: "absolute",
          left: 8,
          bottom: 8,
          bgcolor: "white",
          "&:hover": { bgcolor: "grey.100" },
        }}
      >
        <FavoriteIcon sx={{ color: "#f57c00" }} />
      </IconButton>
    </Card>
  );
}