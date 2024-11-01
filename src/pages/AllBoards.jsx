// BoardsPage.js
import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ModalForm from "../components/common/ModalForm";
import Board from "../components/Board";
import Loader from "../components/common/Loader";
import toast from "react-hot-toast";
import { getAllBoards } from "../apis/board/getAllBoards";
import { createBoard } from "../apis/board/createBoard";
import Notification from "../components/common/Notification";

function BoardsPage() {
  const theme = useTheme();
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  };

  async function fetchData() {
    setLoading(true);
    try {
      const data = await getAllBoards();
      setBoards(data);
    } catch (error) {
      toast.error("Error fetching boards");
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let boardName = e.target.name.value;
    e.target.name.value = "";

    try {
      if (boards.length == 10) {
        throw new Error("Board creation limit exceeded!");
      }
      setLoading(true);
      const newBoard = await createBoard(boardName);
      setBoards((prevBoards) => [...prevBoards, newBoard]);
      toast.success("Board created successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setModal(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Box
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100%",
          flexDirection: "column",
          fontFamily: theme.typography.fontFamily,
        }}
      >
        <Container
          maxWidth={false}
          style={{ paddingTop: "40px", paddingBottom: "40px", width: "80vw" }}
        >
          <Typography
            variant="h6"
            component="h6"
            style={{
              fontFamily: theme.typography.fontFamily,
              color: theme.palette.text.primary,
              padding: "10px",
              textAlign: "left",
              marginBottom: "20px",
              borderBottom: `1px solid ${theme.palette.secondary.light}`,
            }}
          >
            Boards
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              marginBottom: "20px",
            }}
          >
            {boards.length > 0 ? (
              boards.map((item) => <Board data={item} key={item.id} />)
            ) : (
              !loading && <Box
                minWidth={false}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                  p: 5,
                  color: theme.palette.secondary.extraLight,
                  textAlign: "center",
                }}
              >
                No Boards available!
              </Box>
            )}
          </Box>
          <Button
            id="openModalBtn"
            onClick={handleModal}
            variant="contained"
            sx={{
              backgroundColor: theme.palette.primary.main,
              width: "200px",
              height: "50px",
              borderRadius: "4px",
              fontFamily: theme.typography.fontFamily,
              color: theme.text,
              "&:hover": {
                backgroundColor: theme.palette.secondary.main,
                boxShadow: "none",
              },
            }}
          >
            Create Board
          </Button>
        </Container>
        <ModalForm
          item={"Board"}
          modal={modal}
          handleModal={handleModal}
          handleSubmit={handleSubmit}
        />
      </Box>
      <Notification />
      {loading && <Loader />}
    </>
  );
}

export default BoardsPage;
