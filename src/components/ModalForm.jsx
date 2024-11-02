import {
  Modal,
  Box,
  Typography,
  InputBase,
  Button,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useTheme } from "@emotion/react";

function ModalForm({ item, modal, handleModal, handleSubmit }) {
  const theme = useTheme();

  return (
    <Modal
      open={modal}
      onClose={handleModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: theme.palette.primary.dark,
          p: 4,
          border: `1px solid ${theme.palette.primary.main}`,
          maxWidth: 400,
          width: "100%",
          borderRadius: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            id="modal-title"
            style={{
              color: theme.palette.text.primary,
              fontFamily: theme.typography.fontFamily,
            }}
          >
            Create {item}
          </Typography>
          <IconButton onClick={handleModal}>
            <CloseIcon
              style={{
                color: theme.palette.secondary.light,
              }}
            />
          </IconButton>
        </Box>
        <form onSubmit={(e) => handleSubmit(e)}>
          <InputBase
            autoFocus
            id="name"
            placeholder={item+` name`}
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
          />
          <Box sx={{ display: "flex" , marginTop: '10px'}}>
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: theme.palette.secondary.main,
                color: "white",
                "&:hover": {
                  backgroundColor: theme.palette.secondary.light,
                },
              }}
            >
              Create
            </Button>
            <Button
              variant="text"
              onClick={handleModal}
              sx={{
                ml: 2,
                color: theme.palette.text.primary,
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default ModalForm;
