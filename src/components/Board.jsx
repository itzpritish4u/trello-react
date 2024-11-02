import { Link as RouterLink } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

function Board({ data }) {
  const theme = useTheme();
  return (
    <Box
      component={RouterLink}
      to={`/board/${data.id}`}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "360px",
        height: "150px",
        borderRadius: "8px",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.primary,
        textDecoration: "none",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        border: `1px solid ${theme.palette.secondary.main}`,
        transition:
          "background-color 0.3s, color 0.3s, transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          backgroundColor: "#444",
          transform: "scale(1.05)",
          boxShadow: "none",
        },
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", fontFamily: theme.typography.fontFamily }}
      >
        {data.name}
      </Typography>
    </Box>
  );
}

export default Board;
