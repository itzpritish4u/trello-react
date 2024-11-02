import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Box,
  Button,
  LinearProgress,
  Typography,
  IconButton,
  InputBase,
} from "@mui/material";
import { useTheme } from "@emotion/react";

import toast from "react-hot-toast";

import { createCheckitems } from "../APIs/checkitem/createCheckitem";
import { deleteCheckitems } from "../APIs/checkitem/deleteCheckitems";
import { updateCheckitem } from "../APIs/checkitem/updateCheckitem";
import { getCheckitems } from "../APIs/checkitem/getCheckitems";

import Checkitem from "./Checkitem";
import Notification from "./Notification";

function Checklist({ cardId, data, handleDeleteChecklist, setLoading }) {
  const [Checkitems, setCheckitems] = useState([]);
  const [addItemToggle, setAddItemToggle] = useState(false);
  const [percentCompletion, setPercentCompletion] = useState(0);
  const theme = useTheme();

  const fetchCheckitems = async () => {
    try {
      setLoading(true);
      const CheckitemsData = await getCheckitems(data.id);
      setCheckitems(CheckitemsData);
      updatePercentCompletion(CheckitemsData);
    } catch (error) {
      toast.error("Error in fetching checklist items");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCheckitems = async (e) => {
    setLoading(true);
    e.preventDefault();
    const CheckitemsName = e.target.CheckitemsName.value;
    if(CheckitemsName.length==0) throw new Error("Invalid name for a checklist item");
    e.target.CheckitemsName.value = "";

    try {
      const newCheckitems = await createCheckitems(
        CheckitemsName,
        data.id
      );
      let updatedItems = [...Checkitems, newCheckitems];
      setCheckitems(updatedItems);
      updatePercentCompletion(updatedItems);

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCheckitems = async (id) => {
    let temp = [...Checkitems];
    try {
      setLoading(true);
      temp = temp.filter((Checkitems) => Checkitems.id !== id);
      setCheckitems(temp);
      await deleteCheckitems(data.id, id);
      updatePercentCompletion(temp);

    } catch (error) {
      toast.error("Error in deleting checklist item");
    } finally {
      setLoading(false);
    }
  };

  const updatePercentCompletion = (items) => {
    const total = items.length;
    const checkedItems = items.filter(
      (item) => item.state === "complete"
    ).length;
    setPercentCompletion(
      total > 0 ? Math.round((checkedItems / total) * 100) : 0
    );
  };

  const handleUpdateCheckitem = async (id, state) => {
    try {
      const status = state ? "complete" : "incomplete";

      setCheckitems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, state: status } : item))
      );

      updatePercentCompletion(
        Checkitems.map((item) =>
          item.id === id ? { ...item, state: status } : item
        )
      );
      await updateCheckitem(cardId, id, status);
    } catch (error) {
      toast.error("Error in updating checklist item");
    }
  };

  useEffect(() => {
    fetchCheckitems();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: "16px",
        p: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            borderBottom: `1px solid ${theme.palette.secondary.main}`,
            width: "95%",
            pb: 2,
          }}
        >
          <FontAwesomeIcon
            icon={faSquareCheck}
            style={{ color: `${theme.palette.text.primary}`, fontSize: "2rem" }}
          />
          <Typography
            variant="body1"
            style={{
              color: `${theme.palette.text.primary}`,
              fontSize: "1.2rem",
            }}
          >
            {data.name}
          </Typography>
        </Box>
        <IconButton
          onClick={() => handleDeleteChecklist(data.id)}
          sx={{
            color: theme.palette.secondary.extraLight,
            fontSize: "15px",
            "&:hover": { color: "red" },
          }}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography
          variant="body1"
          sx={{ color: `${theme.palette.text.primary}`, width: "30px" }}
        >
          {percentCompletion}%
        </Typography>
        <LinearProgress
          variant="determinate"
          value={percentCompletion}
          sx={{
            flexGrow: 1,
            color: theme.palette.primary.accent,
            height: "12px", 
            borderRadius: "8px",
            backgroundColor: theme.palette.primary.main,
            "& .MuiLinearProgress-bar": {
              backgroundColor: theme.palette.primary.accent,
              transition: ".2s ease"
            },
          }}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2,mr:1}}>
        {Checkitems.map((item) => (
          <Checkitem
            key={item.id}
            item={item}
            handleDeleteCheckitems={handleDeleteCheckitems}
            handleUpdateCheckitem={handleUpdateCheckitem}
          />
        ))}
        {!addItemToggle ? (
          <Button
            variant="contained"
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.text.primary,
              width: "fit-content",
              borderRadius: "4px",
              fontFamily: theme.typography.primary,
              "&:hover": {
                backgroundColor: theme.palette.secondary.light,
                boxShadow: "none",
              },
            }}
            onClick={() => setAddItemToggle(true)}
          >
            Add an item
          </Button>
        ) : (
          <form onSubmit={(e) => handleAddCheckitems(e)}>
            <InputBase
              id="CheckitemsName"
              placeholder="Add a checklist"
              sx={{
                flex: 1,
                bgcolor: "none",
                color: "white",
                border: `1px solid ${theme.palette.secondary.light}`,
                borderRadius: 2,
                fontFamily: theme.typography.fontFamily,
                padding: 1,
                width: "100%",
                mb: 2,
              }}
            />
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.text.primary,
                  width: "fit-content",
                  borderRadius: "4px",
                  fontFamily: theme.typography.fontFamily,
                  "&:hover": {
                    backgroundColor: theme.palette.secondary.light,
                    boxShadow: "none",
                  },
                }}
              >
                Add
              </Button>
              <Button
                onClick={() => setAddItemToggle(false)}
                sx={{
                  backgroundColor: "none",
                  color: theme.palette.text.primary,
                  width: "fit-content",
                  borderRadius: "4px",
                  fontFamily: theme.typography.fontFamily,
                }}
              >
                Cancel
              </Button>
            </Box>
          </form>
        )}
      </Box>
      <Notification />
    </Box>
  );
}

export default Checklist;
