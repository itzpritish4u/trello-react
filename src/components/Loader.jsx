import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useTheme } from "@emotion/react";

function Loader() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        position: "absolute",
        zIndex: 3,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        top: 0,
      }}
    >
      <CircularProgress
        size={"3rem"}
        sx={{ color: theme.palette.primary.accent }}
      />
    </Box>
  );
}

export default Loader;
