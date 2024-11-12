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
import { handleCreateUserAction } from "@/action/userAction";
import { AppContext } from "@/context/AppProvider";

type ModalAddUserProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

interface FormRegisterElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
  confirmPassword: HTMLInputElement;
}

interface RegisterFormElement extends HTMLFormElement {
  readonly elements: FormRegisterElements;
}


export default function ModalAddUser({ open, setOpen }: ModalAddUserProps) {
  const {openSnackbar} = React.useContext(AppContext);
  const handleSubmit = async (e: React.FormEvent<RegisterFormElement>) => {
    e.preventDefault();
    const res = await handleCreateUserAction({
      email: e.currentTarget.elements.email.value.trim(),
      password: e.currentTarget.elements.password.value.trim(),
      rePassword: e.currentTarget.elements.confirmPassword.value.trim(),
      name: e.currentTarget.elements.name.value.trim(),
    });
    if (res?.data) {
      setOpen(false);
      openSnackbar({message: "Thêm người dùng thành công", color: "success"});
    }else{
      openSnackbar({message: res?.message, color: "danger"});
    }
  };
  return (
    <React.Fragment>
      <Modal disableRestoreFocus 
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
          <DialogTitle>Thêm người dùng</DialogTitle>
          <DialogContent>Nhập thông tin người dùng</DialogContent>
          <form
            onSubmit={handleSubmit}
          >
            <Stack spacing={2}>
              <FormControl required>
                <FormLabel>
                  Họ và tên
                </FormLabel>
                <Input autoFocus name="name" />
              </FormControl>
              <FormControl required>
                <FormLabel>
                  Email
                </FormLabel>
                <Input name="email" type="email"/>
              </FormControl>
              <FormControl required>
                <FormLabel>
                  Mật khẩu
                </FormLabel>
                <Input name="password" type="password"/>
              </FormControl>
              <FormControl required>
                <FormLabel>
                  Nhập lại mật khẩu
                </FormLabel>
                <Input name="confirmPassword" type="password"/>
              </FormControl>
              <Button type="submit">
                Thêm người dùng
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
