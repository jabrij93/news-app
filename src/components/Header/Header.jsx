import { Box, TextField, Button, Chip } from "@mui/material";

const Header = ({ keyword, onKeywordChange, onSearch, onLogout, username }) => {
  return (
    <Box
      sx={{
        height: "10vh",
        minHeight: 64,
        px: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "linear-gradient(90deg, #ff8c00 0%, #ff4500 100%)",
      }}
    >
      {/* Left */}
      <Box sx={{ color: "white", fontSize: 26, fontWeight: 600, whiteSpace: "nowrap" }}>
        find.My.News :)
      </Box>

      {/* Middle (search centered-ish, capped width) */}
      <Box sx={{ flex: 1, display: "flex", justifyContent: "center", px: 2 }}>
        <Box sx={{ width: "100%", maxWidth: 900 }}>
          <TextField
            fullWidth
            value={keyword ?? ""}
            placeholder="Olympics"
            onChange={(e) => onKeywordChange?.(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "white",
                height: 40,
                borderRadius: 1, 
              },
            }}
          />
        </Box>
      </Box>

      {/* Right (pinned to far right) */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, whiteSpace: "nowrap" }}>
        <Button
          variant="contained"
          onClick={onSearch}
          sx={{ height: 40, px: 2.5, boxShadow: "none", borderRadius: 1, bgcolor: "#f57c00" }}
        >
          Search for News
        </Button>

        <Chip
          label={username ?? "User"}
          sx={{ height: 36, width: 80, borderRadius: 999, bgcolor: "#f57c00", color: "white" }}
        />

        <Button
          variant="contained"
          onClick={onLogout}
          sx={{ height: 40, px: 2.5, boxShadow: "none", borderRadius: 1, bgcolor: "#f57c00" }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
