import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import Notification from "./Notification";
import Checklist from "./Checklist";

import { getChecklists } from "../APIs/checklist/getChecklists";
import { createChecklist } from "../APIs/checklist/createChecklist";
import { deleteChecklist } from "../APIs/checklist/deleteChecklist";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputBase,
  Typography,
  Box,
} from "@mui/material";
import { useTheme } from "@emotion/react";

function Card({ modal, handleCardModal, data, setLoading }) {
  const theme = useTheme();
  const [checklists, setChecklists] = useState([]);
  const [createChecklistToggle, setCreateChecklistToggle] = useState(false);
  const [checklistName, setChecklistName] = useState("");

  const handleCreateChecklist = async (e, id) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newChecklist = await createChecklist(checklistName, id);
      setChecklists((prev) => [...prev, newChecklist]);
      toast.success("Checklist created successfully");
      setChecklistName("");
      setCreateChecklistToggle(false);
    } catch (error) {
      toast.error("Failed to create checklist");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteChecklist = async (id) => {
    try {
      setLoading(true);
      await deleteChecklist(id);
      setChecklists((prev) => prev.filter((checklist) => checklist.id !== id));
      toast.success("Checklist deleted successfully");
    } catch (error) {
      toast.error("Failed to delete checklist");
    } finally {
      setLoading(false);
    }
  };

  const fetchChecklists = async () => {
    try {
      setLoading(true);
      const fetchedChecklists = await getChecklists(data.id);
      setChecklists(fetchedChecklists);
    } catch (error) {
      toast.error("Failed to fetch checklists");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChecklists();
  }, []);

  return (
    <>
      <Dialog open={modal} onClose={handleCardModal} maxWidth="md" fullWidth>
        <Box
          sx={{
            background: theme.palette.primary.dark,
            border: `1px solid ${theme.palette.primary.main}`,
            overflow: "hidden",
          }}
        >
          <DialogTitle
            id="dialog-title"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                color: theme.palette.text.secondary,
                borderBottom: `1px solid ${theme.palette.secondary.main}`,
                width: "100%",
              }}
            >
              {data.name}
            </Typography>
            <IconButton
              aria-label="close"
              onClick={handleCardModal}
              sx={{
                color: theme.palette.secondary.light,
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {createChecklistToggle ? (
              <form onSubmit={(e) => handleCreateChecklist(e, data.id)}>
                <InputBase
                  autoFocus
                  id="checklist-name"
                  placeholder="Checklist name"
                  sx={{
                    bgcolor: "none",
                    color: theme.palette.text.primary,
                    border: `1px solid ${theme.palette.secondary.main}`,
                    borderRadius: 2,
                    padding: 1,
                    width: "100%",
                    fontFamily: theme.typography.fontFamily,
                    mb: 1,
                  }}
                  value={checklistName}
                  onChange={(e) => setChecklistName(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.text.primary,
                    borderRadius: "4px",
                    fontFamily: theme.typography.fontFamily,
                    "&:hover": {
                      backgroundColor: theme.palette.secondary.main,
                      boxShadow: "none",
                    },
                  }}
                >
                  Create
                </Button>
                <Button
                  onClick={() => setCreateChecklistToggle(false)}
                  sx={{ color: theme.palette.secondary.extraLight }}
                >
                  Cancel
                </Button>
              </form>
            ) : (
              <Button
                variant="contained"
                onClick={() => setCreateChecklistToggle(true)}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: "#fff",
                  width: "200px",
                  height: "50px",
                  borderRadius: "4px",
                  fontFamily: "Poppins, sans-serif",
                  "&:hover": {
                    backgroundColor: theme.palette.secondary.main,
                    boxShadow: "none",
                  },
                }}
              >
                Create Checklist
              </Button>
            )}
            <Box
              style={{
                maxHeight: "70vh",
                overflowY: "auto",
                margin: "20 0px 20 0px",
                gap: 20,
                display: "flex",
                marginTop: 20,
                flexDirection: "column",
              }}
            >
              {checklists.map((checklist) => (
                <Checklist
                  key={checklist.id}
                  cardId={data.id}
                  data={checklist}
                  handleDeleteChecklist={handleDeleteChecklist}
                  setLoading={setLoading}
                />
              ))}
            </Box>
          </DialogContent>
        </Box>
      </Dialog>

      <Notification />
    </>
  );
}

export default Card;
