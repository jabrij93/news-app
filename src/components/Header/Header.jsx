import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";


const Header = ({ keyword, onKeywordChange, onSearch, onLogout, username }) => {
  return (
    <Grid
      container
      alignItems="center"
      sx={{
        height: "10vh",
        paddingX: 2,
        background: "linear-gradient(135deg, #ff8c00 0%, #ff4500 100%)",
        backgroundSize: "cover",
      }}
    >
      {/* App title on the left */}
      <Grid item xs="auto" sx={{ mr: 3 }}>
        <span style={{ color: "white", fontSize: 24, fontWeight: 600 }}>
          find.My.News :)
        </span>
      </Grid>

      {/* Search box in the middle */}
      <Grid item xs>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Olympics"
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          InputProps={{
            sx: { backgroundColor: "white" },
          }}
        />
      </Grid>

      {/* Search button */}
      <Grid item xs="auto" sx={{ ml: 2 }}>
        <Button
          variant="contained"
          color="warning"
          onClick={onSearch}
          sx={{ height: 40 }}
        >
          Search for News
        </Button>
      </Grid>

      {/* Username chip */}
      <Grid item xs="auto" sx={{ ml: 2 }}>
        <Chip
          color="warning"
          label={username}
          sx={{ color: "white", fontWeight: 500 }}
        />
      </Grid>

      {/* Logout button */}
      <Grid item xs="auto" sx={{ ml: 1 }}>
        <Button
          variant="contained"
          color="warning"
          onClick={onLogout}
          sx={{ height: 40 }}
        >
          Logout
        </Button>
      </Grid>
    </Grid>
  );
};

export default Header;

