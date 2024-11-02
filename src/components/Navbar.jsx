import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrello } from "@fortawesome/free-brands-svg-icons/faTrello";
import { useTheme } from "@emotion/react";

function Navbar() {
  const theme = useTheme();
  return (
    <AppBar position="static" sx={{ bgcolor: theme.palette.primary.main }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            fontFamily: theme.typography.fontFamily,
          }}
        >
          <FontAwesomeIcon icon={faTrello} />
          TRELLO
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
