import * as React from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import InfoIcon from "@mui/icons-material/Info";

type AlertDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  content: string;
  buttonContent: string;
  type: "alert" | "confirm";
  handleFunction: () => Promise<boolean>;
};

export default function AlertDialogModal({
  open,
  setOpen,
  title,
  content,
  buttonContent,
  type,
  handleFunction,
}: AlertDialogProps) {
  const handleConfirm = async () => {
    if ( await handleFunction()) {
      setOpen(false);
    }
  };
  return (
    <React.Fragment>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            {type === "alert" ? (
              <WarningRoundedIcon sx={{ color: "danger" }} />
            ) : (
              <InfoIcon sx={{ color: "primary" }} />
            )}
            {title}
          </DialogTitle>
          <Divider />
          <DialogContent>{content}</DialogContent>
          <DialogActions>
            <Button 
            variant="solid" 
            color={type === "alert" ? "danger" : "primary"} 
            onClick={handleConfirm}>
              {buttonContent}
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setOpen(false)}
            >
              Huỷ
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
