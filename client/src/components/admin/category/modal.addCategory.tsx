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
import { Box, Link, ModalClose, ModalOverflow, Textarea } from "@mui/joy";
import { AppContext } from "@/context/AppProvider";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { handleCreateCategoryAction } from "@/action/categoryAction";

type ModalAddCategoryProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

interface FormDataElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  description: HTMLInputElement;
  fileUpload: HTMLInputElement;
}

interface FormElement extends HTMLFormElement {
  readonly elements: FormDataElements;
}

export default function ModalAddCategory({
  open,
  setOpen,
}: ModalAddCategoryProps) {
  const { openSnackbar } = React.useContext(AppContext);
  const [file, setFile] = React.useState<File[] | undefined>(undefined);
  const handleSubmit = async (e: React.FormEvent<FormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (e.currentTarget.elements.fileUpload.files) {
      const files = e.currentTarget.elements.fileUpload.files;
      if (files) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          formData.append("files", file);
        }
      }
      const res = await handleCreateCategoryAction({
        name: e.currentTarget.elements.name.value,
        description: e.currentTarget.elements.description.value,
        fileUpload: formData,
      });
      if (res?.data) {
        setOpen(false);
        openSnackbar({ message: "Thêm danh mục thành công", color: "success" });
        setFile(undefined);
      } else {
        openSnackbar({ message: res?.message, color: "danger" });
      }
    }
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
            setFile(undefined);
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
              <FormControl required>
                <FormLabel>Tên danh mục</FormLabel>
                <Input autoFocus name="name" />
              </FormControl>
              <FormControl>
                <FormLabel>Mô tả danh mục</FormLabel>
                <Textarea minRows={3} name="description" />
              </FormControl>
              <FormControl>
                <FormLabel>Hình ảnh</FormLabel>
                <Button variant="outlined" component="label">
                  <CloudUploadOutlinedIcon
                    sx={{
                      mr: 1,
                    }}
                  />
                  Chọn hình ảnh
                  <input
                    type="file"
                    hidden
                    name="fileUpload"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files) {
                        setFile(Array.from(e.target.files));
                        console.log(e.target.files);
                      }
                    }}
                  />
                </Button>
                {file && (
                  <Box>
                    {file.map((f, index) => (
                      <Link
                        key={index}
                        href={URL.createObjectURL(f)}
                        target="_blank"
                        mt={1}
                      >
                        {f.name} ({(f.size / 1024 / 1024).toFixed(2)} MB) 
                      </Link>
                    ))}
                  </Box>
                )}
              </FormControl>
              <Button type="submit">Thêm danh mục</Button>
            </Stack>
          </form>
        </ModalDialog>
        </ModalOverflow>
      </Modal>
    </React.Fragment>
  );
}
