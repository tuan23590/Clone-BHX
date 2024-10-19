import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import { Box, DialogActions, Link, ModalClose, ModalOverflow, Textarea } from "@mui/joy";
import { AppContext } from "@/context/AppProvider";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
type ModalAddCategoryProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  formData: { _id: string; name: string; description: string; image: string };
};

interface FormDataElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  description: HTMLInputElement;
  fileUpload: HTMLInputElement;
}

interface FormElement extends HTMLFormElement {
  readonly elements: FormDataElements;
}

export default function ModalCategoryDetail({
  open,
  setOpen,
  formData,
}: ModalAddCategoryProps) {
  const { openSnackbar } = React.useContext(AppContext);
  const handleSubmit = async (e: React.FormEvent<FormElement>) => {
    e.preventDefault();
  };
  return (
    <React.Fragment>
      <Modal
        disableRestoreFocus
        open={open}
        onClose={(
          _event: React.MouseEvent<HTMLButtonElement>,
          reason: string
        ) => {
          if (reason === "backdropClick") {
            return;
          } else {
            setOpen(false);
          }
        }}
      >
        <ModalOverflow>
          <ModalDialog size="lg" minWidth={"30%"}>
            <ModalClose />
            <DialogTitle>Thêm danh mục</DialogTitle>
            <DialogContent>Nhập thông tin danh mục</DialogContent>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <FormControl required disabled>
                  <FormLabel>Tên danh mục</FormLabel>
                  <Input autoFocus name="name" defaultValue={formData?.name} />
                </FormControl>
                <FormControl disabled>
                  <FormLabel>Mô tả danh mục</FormLabel>
                  <Textarea
                    minRows={3}
                    name="description"
                    defaultValue={formData?.description}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Hình ảnh</FormLabel>
                  {formData?.image && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mt: 2,
                        overflow: "hidden",
                      }}
                    >
                      <Link href={formData?.image} target="_blank">
                        <img
                          src={formData?.image}
                          alt={formData?.name}
                          width={300}
                        />
                      </Link>
                    </Box>
                  )}
                </FormControl>
                <FormControl disabled>
                  <FormLabel>Danh mục con</FormLabel>
                </FormControl>
                <FormControl>
                  <FormLabel>Danh mục con</FormLabel>
                  <Input
                    name="name"
                    placeholder="Tên danh mục"
                    endDecorator={<Button>Thêm danh mục con</Button>}
                  />
                </FormControl>
              </Stack>
            </form>
            <DialogActions>
              <Button
              color="danger"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Thoát
              </Button>
              <Button sx={{display: "none"}}>Lưu</Button>
            </DialogActions>
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </React.Fragment>
  );
}
