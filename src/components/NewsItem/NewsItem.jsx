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

export default function NewsItem({ newsObject, updateMyFavourites }) {
  const sourceName = newsObject?.source?.name || "Unknown Source";
  const publishedTime = formatPublishedAt(newsObject?.publishedAt);
  const title = newsObject?.title || "";
  const imageUrl = newsObject?.urlToImage || "";
  const articleUrl = newsObject?.url || "";

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
      publishedAt: newsObject?.publishedAt || "",
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
    <Card sx={{ height: "100%", position: "relative" }}>
    <CardActionArea onClick={openArticle} sx={{ height: "100%" }}>
        {imageUrl ? (
        <CardMedia component="img" height="180" image={imageUrl} alt={title} />
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

        <CardContent>
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

        <Typography variant="body2">{title}</Typography>
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