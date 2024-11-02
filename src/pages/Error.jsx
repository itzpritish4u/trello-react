import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

function ErrorPage() {
  return (
    <Box
      className="content"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        flexDirection: "column",
        bgcolor: "#111",
      }}
    >
      <Typography variant="h1" sx={{ fontSize: {xs:"2rem",sm:"3rem",md:'4rem',lg:'5rem'}, fontWeight:"700",marginBottom: "20px" ,color:'white'}}>
        404
      </Typography>

      <Typography variant="h3" sx={{ fontSize: {xs:"1.5rem",sm:"2rem",md:'2.5rem',lg:'3rem'}, marginBottom: "20px" ,color:'white'}}>
        Page Not found
      </Typography>
      <Button
        component={Link}
        to="/boards"
        variant="text"
        sx={{ fontSize: {xs:"1rem",sm:"1rem",md:'1rem',lg:'1rem'}, textDecoration: "none", color: "white" }}
      >
        Go back to view boards
      </Button>
    </Box>
  );
}

export default ErrorPage;
