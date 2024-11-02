import { useEffect, useState } from "react";
import { getCards } from "../APIs/card/getCards";
import { createCard } from "../APIs/card/createCard";
import { archiveCard } from "../APIs/card/deleteCard";
import CardItem from "./CardItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faAdd } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import Notification from "./Notification";

import { Box, IconButton, InputBase, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

function List({ data, handleDeleteList, setLoading }) {
  const [cards, setCards] = useState([]);
  const theme  = useTheme();

  async function fetchCards() {
    try {
      setLoading(true);
      const cardData = await getCards(data.id);
      setCards(cardData);
    } catch (error) {
      toast.error("Error in getting cards!");
    } finally {
      setLoading(false);
    }
  }

  const handleAddCard = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const cardName = e.target.cardName.value;

      if (cardName.length == 0) {
        throw new Error("Invalid Card Name");
      }
      e.target.cardName.value = "";
      const newCard = await createCard(cardName, data.id);
      setCards((prev) => [...prev, newCard]);
      toast.success("Card created successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCard = async (e, id) => {
    try {
      setLoading(true);
      e.stopPropagation();
      let temp = [...cards];
      temp = temp.filter((card) => card.id !== id);
      setCards(temp);
      await archiveCard(id);
      setLoading(false);
      toast.success("Card deleted successfully!");
    } catch (error) {
      toast.error("Error in deleting card!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <>
      <Box
        sx={{
          bgcolor: theme.palette.primary.main,
          color: theme.palette.text.primary,
          minWidth: {lg:400,sm:300},
          p: 3,
          borderRadius: 2,
          height: "fit-content",
          border: `1px solid ${theme.palette.secondary.main}`,
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,

          "&:hover": {
            border: `1px solid ${theme.palette.secondary.light}`,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `1px solid ${theme.palette.secondary.light}`,
            paddingBottom: "10px",
          }}
        >
          <Typography
            variant="h7"
            sx={{ color: theme.palette.text.primary, fontFamily: theme.typography.fontFamily }}
          >
            {data.name}
          </Typography>
          <IconButton
            onClick={() => handleDeleteList(data.id)}
            sx={{
              color: theme.palette.secondary.light,
              fontSize: "15px",
              "&:hover": { color: "red" },
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </IconButton>
        </Box>
        <Box
          component="form"
          onSubmit={handleAddCard}
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <InputBase
            id="cardName"
            placeholder="Add a card"
            sx={{
              flex: 1,
              bgcolor: "none",
              color: theme.palette.text.primary,
              border: `1px solid ${theme.palette.secondary.light}`,
              borderRadius: 2,
              padding: 1,
            }}
          />
          <IconButton
            type="submit"
            sx={{
              color: theme.palette.text.secondary,
              fontSize: "16px",
              bgcolor: theme.palette.secondary.light,
              borderRadius: 1,
              flex: 0.1,
              "&:hover": {
                bgcolor: theme.palette.secondary.extraLight,
              },
            }}
          >
            <FontAwesomeIcon icon={faAdd} />
          </IconButton>
        </Box>
        <Box
          sx={{
            bgcolor: "none",
            color: "red",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            maxHeight: 300,
            overflow: "auto",
            pr: 1,
          }}
        >
          {cards.length
            ? cards.map((card) => (
                <CardItem
                  data={card}
                  handleDeleteCard={handleDeleteCard}
                  key={card.id}
                  setLoading={setLoading}
                />
              ))
            : null}
        </Box>
      </Box>
      <Notification />
    </>
  );
}

export default List;
