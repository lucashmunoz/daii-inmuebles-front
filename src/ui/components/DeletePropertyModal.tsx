import { Box, Button, Divider, Modal, useMediaQuery } from "@mui/material";
import Typography from "@mui/material/Typography";
import { isMobileMediaQuery } from "../../helpers";

const DeletePropertyModal = (
  {
    isOpen,
    onClose,
    handleDelete
  }: {
    isOpen: boolean,
    onClose: () => void,
    handleDelete: () => void
  }) => {
  const isMobile = useMediaQuery(isMobileMediaQuery);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
    >
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: isMobile ? "90%" : 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        borderRadius: "8px"
      }}>
        <Typography variant="h6" component="h2" fontWeight={700}
          sx={{
            p: 1,
            backgroundColor: "other.A100",
            borderRadius: "8px"
          }}>
        ¿Eliminar publicación?
        </Typography>
        <Divider />
        <Typography sx={{
          p: 1
        }}>
        Esta acción no puede deshacerse.
        </Typography>
        <Divider />
        <Box sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 1,
          gap: 2
        }}>
          <Button onClick={onClose} variant="outlined" color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} variant="contained" sx={{
            color: "white",
            backgroundColor: "error.darker"
          }}
          >
            Eliminar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeletePropertyModal;
