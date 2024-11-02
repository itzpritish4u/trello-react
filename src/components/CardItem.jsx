import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { Box, Typography, IconButton } from "@mui/material";
import { useTheme } from "@emotion/react";

import Card from "./Card";

function CardItem({ data, handleDeleteCard, setLoading }) {
  const [cardModal, setCardModal] = useState(false);
  const theme = useTheme();

  const handleCardModal = () => {
    setCardModal(!cardModal);
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: theme.palette.secondary.main,
          borderRadius: 2,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: theme.palette.secondary.light,
          },
        }}
        onClick={handleCardModal}
      >
        <Typography sx={{ color: theme.palette.text.secondary, flexGrow: 1 }}>
          {data.name}
        </Typography>
        <IconButton
          onClick={(e) => handleDeleteCard(e, data.id)}
          sx={{
            color: theme.palette.secondary.extraLight,
            fontSize: "15px",
            "&:hover": { color: "red" },
          }}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </IconButton>
      </Box>
      {cardModal && (
        <Card
          modal={cardModal}
          handleCardModal={handleCardModal}
          data={data}
          setLoading={setLoading}
        />
      )}
    </>
  );
}

export default CardItem;
