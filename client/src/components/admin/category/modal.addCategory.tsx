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
import { Box, Link, ModalClose, Textarea } from "@mui/joy";
import { AppContext } from "@/context/AppProvider";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { handleUploadFileAction } from "@/action/fileAction";
import { handleCreateCategoryAction } from "@/action/categoryAction";

type ModalAddCategoryProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

interface FormDataElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  description: HTMLInputElement;
  filePath: HTMLInputElement;
}

interface FormElement extends HTMLFormElement {
  readonly elements: FormDataElements;
}

export default function ModalAddCategory({
  open,
  setOpen,
}: ModalAddCategoryProps) {
  const { openSnackbar } = React.useContext(AppContext);
  const [file, setFile] = React.useState<{
    fileName: string;
    fileSize: number;
  }>();
  const handleSubmit = async (e: React.FormEvent<FormElement>) => {
    e.preventDefault();
    console.log(e.currentTarget.elements.name.value);
    console.log(e.currentTarget.elements.description.value);
    console.log(file?.fileName.split("/")[3]);

    const res = await handleCreateCategoryAction({
      name: e.currentTarget.elements.name.value,
      description: e.currentTarget.elements.description.value,
      filePath: file?.fileName.split("/")[3] ?? "",
    });
    if (res?.data) {
      setOpen(false);
      openSnackbar({ message: "Thêm người dùng thành công", color: "success" });
    } else {
      openSnackbar({ message: res?.message, color: "danger" });
    }
    console.log(res);
  };
  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("files", file);
    const res = await handleUploadFileAction(formData);
    console.log(res);
    if (res?.data) {
      setFile({
        fileName: res?.data[0]?.fileName,
        fileSize: res?.data[0]?.fileSize,
      });
    } else {
      openSnackbar({ message: res?.message, color: "danger" });
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
          }
        }}
      >
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
                  <input type="file" hidden onChange={handleUploadFile} name="filePath"/>
                </Button>
                {file && (
                  <Box>
                  <Link mt={1} href={file?.fileName} target="_blank">
                    {file?.fileName}(
                    {
                      // to MB
                      file?.fileSize
                        ? `${(file?.fileSize / 1024 / 1024).toFixed(2)} MB`
                        : ""
                    }
                    )
                  </Link>
                </Box>
                )}
              </FormControl>
              <Button type="submit">Thêm danh mục</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
