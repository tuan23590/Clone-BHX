"use client";
import {
  Modal,
  ModalDialog,
  DialogTitle,
  DialogContent,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Step,
  StepIndicator,
  Typography,
  Stepper,
  stepClasses,
  stepIndicatorClasses,
  ModalClose,
} from "@mui/joy";
import React, { useState } from "react";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { sendRequest } from "@/utils/api";
import CloseIcon from "@mui/icons-material/Close";

type ModalRegisterProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
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

  interface FormVerifyElements extends HTMLFormControlsCollection {
    verifyCode: HTMLInputElement;
  }

interface VerifyFormElement extends HTMLFormElement {
    readonly elements: FormVerifyElements;
  }

export default function ModalRegister({ open, setOpen }: ModalRegisterProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [_id, set_id] = useState("");
  const handleSubmitFormStep0 = async (event: React.FormEvent<RegisterFormElement>) => {
    event.preventDefault();
    const res = await sendRequest<IBackendRes<any>>({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/api/v1/auth/register`,
      body: {
        email: event.currentTarget.elements.email.value.trim(),
        password: event.currentTarget.elements.password.value.trim(),
        rePassword: event.currentTarget.elements.confirmPassword.value.trim(),
        name: event.currentTarget.elements.name.value.trim(),
      },
    });
    if (res?.data) {
      setCurrentStep(1);
        set_id(res?.data?.data._id);
    } else {
      alert(res?.message);
    }
  };
  const handleSubmitFormStep1 = async (event: React.FormEvent<VerifyFormElement>) => {
    event.preventDefault();
    const res = await sendRequest<IBackendRes<any>>({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/api/v1/auth/verify`,
      body: {
        verifyCode: event.currentTarget.elements.verifyCode.value.trim(),
        _id,
      },
    });
    if (res?.data) {
      setCurrentStep(3);
    } else {
      alert(res?.message);
    }
  };
  const handleSubmitFormStep2 = async (event: any) => {
    event.preventDefault();
    setOpen(false);
  };
  const steps = [
    { label: "Điền thông tin", subLabel: "01" },
    { label: "Xác thực", subLabel: "02" },
    { label: "Hoàn thành", subLabel: "03" },
  ];
  return (
    <Modal open={open}>
      <ModalDialog size="lg">
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography level="h3">Đăng ký tài khoản</Typography>
          <CloseIcon
            sx={{
              cursor: "pointer",
              padding: 1,
              borderRadius: "20%",
              width: "40px",
              height: "40px",
              ":hover": {
                backgroundColor: "#eeeeee",
              },
            }}
            onClick={() => {
              setOpen(false);
            }}
          />
        </DialogTitle>
        <DialogContent>
          Để đăng ký tài khoản, vui lòng điền thông tin các thông tin bên dưới
        </DialogContent>
        <Stepper
          sx={{
            width: "100%",
            [`& .${stepClasses.completed}::after`]: {
              bgcolor: "primary.500",
            },
            [`& .${stepClasses.active} .${stepIndicatorClasses.root}`]: {
              borderColor: "primary.500",
            },
            [`& .${stepClasses.root}:has(+ .${stepClasses.active})::after`]: {
              color: "primary.500",
              backgroundColor: "transparent",
              backgroundImage:
                "radial-gradient(currentColor 2px, transparent 2px)",
              backgroundSize: "7px 7px",
              backgroundPosition: "center left",
            },
            [`& .${stepClasses.disabled} *`]: {
              color: "neutral.plainDisabledColor",
            },
          }}
        >
          {steps.map((step, index) => (
            <Step
              key={index}
              completed={index < currentStep}
              active={index === currentStep}
              disabled={index > currentStep}
              orientation="vertical"
              indicator={
                <StepIndicator
                  variant={index <= currentStep - 1 ? "solid" : "outlined"}
                  color="primary"
                >
                  {index <= currentStep ? <CheckRoundedIcon /> : null}
                </StepIndicator>
              }
            >
              <Typography
                level="h4"
                endDecorator={
                  <Typography
                    sx={{
                      fontSize: "sm",
                      fontWeight: "normal",
                      marginTop: "1px",
                    }}
                  >
                    {step.label}
                  </Typography>
                }
                sx={{ fontWeight: "xl" }}
              >
                {step.subLabel}
              </Typography>
            </Step>
          ))}
        </Stepper>

        {currentStep === 0 && (
          <form onSubmit={handleSubmitFormStep0}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Họ và tên</FormLabel>
                <Input required autoFocus name="name"/>
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input required autoFocus name="email" type="email"/>
              </FormControl>
              <FormControl>
                <FormLabel>Mật khẩu</FormLabel>
                <Input required autoFocus type="password" name="password"/>
              </FormControl>
              <FormControl>
                <FormLabel>Nhập lại mật khẩu</FormLabel>
                <Input required autoFocus type="password" name="confirmPassword"/>
              </FormControl>
              <Button type="submit">Đăng ký tài khoản</Button>
            </Stack>
          </form>
        )}

        {currentStep === 1 && (
          <form onSubmit={handleSubmitFormStep1}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Mã xác thực</FormLabel>
                <Input required autoFocus name="verifyCode"/>
              </FormControl>
              <Button type="submit">
                Xác thực tài khoản
                </Button>
            </Stack>
          </form>
        )}
        {currentStep === 3 && (
          <>
            <Typography level="h4" textAlign={"center"}>
              Tạo tài khoản thành công. Bạn có thể đăng nhập ngay bây giờ.
            </Typography>
            <Button onClick={handleSubmitFormStep2}>Đóng</Button>
          </>
        )}
      </ModalDialog>
    </Modal>
  );
}
