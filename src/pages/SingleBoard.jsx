import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Box, Button, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTheme } from "@mui/material/styles";

import toast from "react-hot-toast";

import { getLists } from "../APIs/list/getLists";
import { createList } from "../APIs/list/createList";
import { archiveList } from "../APIs/list/deleteList";

import List from "../components/List";
import ModalForm from "../components/ModalForm";
import Loader from "../components/Loader";
import Notification from "../components/Notification";

function SingleBoard() {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [lists, setLists] = useState([]);
  const [modal, setModal] = useState(false);

  async function fetchLists() {
    try {
      setLoading(true);
      const lists = await getLists(id);
      setLists(lists);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Error fetching lists");
    }
  }

  const handleModal = () => {
    setModal(!modal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const listName = e.target.name.value;
    e.target.name.value = "";

    try {
      setLoading(true);
      const newList = await createList(listName, id);
      setLists((prev) => [...prev, newList]);
      setModal(false);
      toast.success("List created successfully!");
    } catch (error) {
      toast.error("Error in creating list", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleDeleteList = async (id) => {
    let temp = [...lists];
    try {
      setLoading(true);
      temp = temp.filter((list) => list.id !== id);
      setLists(temp);
      await archiveList(id);
      toast.success("List deleted successfully!");
    } catch (error) {
      toast.error("Error deleting list");
      setLists(temp);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  return (
    <>
      <Box
        component="section"
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "80vw",
            pt: 5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "30px" }}>
              <IconButton
                onClick={handleBack}
                sx={{
                  width: 45,
                  height: 45,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  bgcolor: "none",
                  color: theme.palette.text.secondary,
                  "&:hover": {
                    color: theme.palette.text.primary,
                  },
                  borderRadius: "50%",
                  border: `1px solid ${theme.palette.text.secondary}`,
                }}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography
                component="h2"
                sx={{
                  color: theme.palette.text.primary,
                  fontSize: 22,
                  fontFamily: theme.typography.fontFamily,
                  fontWeight: "bold",
                }}
              >
                Board
              </Typography>
            </Box>
            <Button
              variant="contained"
              onClick={handleModal}
              sx={{
                backgroundColor: theme.palette.primary.main,
                height: "50px",
                borderRadius: "4px",
                color: theme.text,
                fontFamily: theme.typography.fontFamily,
                "&:hover": {
                  backgroundColor: theme.palette.secondary.main,
                  boxShadow: "none",
                },
              }}
            >
              Add List
            </Button>
          </Box>

          <Box
            minWidth={false}
            sx={{
              display: "flex",
              gap: 5,
              mt: 10,
              overflowX: { lg: "auto", md: "auto", sm: "none", xs: "none" },
              overflowY: { lg: "none", md: "none", sm: "scroll", xs: "scroll" },
              height: "100%",
              p: 5,
              border: `1px solid ${theme.palette.secondary.main}`,
              borderRadius: "8px",
              width: "100%",
              flexDirection: {
                lg: "row",
                md: "row",
                sm: "column",
                xs: "column",
              },
            }}
          >
            {lists.length > 0
              ? lists.map((list) => (
                  <List
                    data={list}
                    key={list.id}
                    handleDeleteList={handleDeleteList}
                    setLoading={setLoading}
                  />
                ))
              : !loading && (
                  <Box
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
                    No Lists available on this board
                  </Box>
                )}
          </Box>
        </Box>

        {modal && (
          <ModalForm
            item={"List"}
            modal={modal}
            handleModal={handleModal}
            handleSubmit={handleSubmit}
          />
        )}
      </Box>
      <Notification />

      {loading && <Loader />}
    </>
  );
}

export default SingleBoard;
