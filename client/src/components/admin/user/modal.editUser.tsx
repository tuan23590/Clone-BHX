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
import { ModalClose } from "@mui/joy";
import {
  handleUpdateUserAction,
} from "@/action/userAction";
import { AppContext } from "@/context/AppProvider";

type ModalAddUserProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  formData: {
    _id: string;
    email: string;
    name: string;
    address: string;
    phone: string;
  };
};

interface FormRegisterElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
  confirmPassword: HTMLInputElement;
  address: HTMLInputElement;
  phone: HTMLInputElement;
}

interface RegisterFormElement extends HTMLFormElement {
  readonly elements: FormRegisterElements;
}

export default function ModalEditUser({
  open,
  setOpen,
  formData,
}: ModalAddUserProps) {
  const { openSnackbar } = React.useContext(AppContext);
  const handleSubmit = async (e: React.FormEvent<RegisterFormElement>) => {
    e.preventDefault();
    const res = await handleUpdateUserAction({
      data: {
        _id: formData._id,
        email: formData.email,
        name: e.currentTarget.elements.name.value,
        address: e.currentTarget.elements.address.value,
        phone: e.currentTarget.elements.phone.value,
      },
    });
    if (res.data) {
      openSnackbar({
        message: "Cập nhật người dùng thành công",
        color: "success",
      });
      setOpen(false);
    } else {
      openSnackbar({
        message: res.message.toString(),
        color: "danger",
      });
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
          <DialogTitle>
            Chỉnh sửa thông tin người dùng
          </DialogTitle>
          <DialogContent>Nhập thông tin người dùng</DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControl required>
                <FormLabel>Id</FormLabel>
                <Input name="id" defaultValue={formData._id} disabled />
              </FormControl>
              <FormControl required>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  defaultValue={formData.email}
                  disabled
                />
              </FormControl>
              <FormControl required>
                <FormLabel>Họ và tên</FormLabel>
                <Input autoFocus name="name" defaultValue={formData.name} />
              </FormControl>
              <FormControl>
                <FormLabel>Địa chỉ</FormLabel>
                <Input name="address" defaultValue={formData.address} />
              </FormControl>
              <FormControl>
                <FormLabel>Số điện thoại</FormLabel>
                <Input name="phone" defaultValue={formData.phone} />
              </FormControl>
              <Button type="submit">Lưu thay đổi</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
