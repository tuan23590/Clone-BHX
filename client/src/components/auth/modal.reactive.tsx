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
} from "@mui/joy";
import React, { useState } from "react";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { sendRequest } from "@/utils/api";

type ModalReactiveProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
};

export default function ModalReactive({
  open,
  setOpen,
  email,
}: ModalReactiveProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [_id, set_id] = useState("");
    const handleSubmitFormStep0 = async (event: any) => {
        event.preventDefault();
        const res= await sendRequest<IBackendRes<any>>({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/api/v1/auth/resend-code`,
            body: {
              email : event.target[0].value.trim(),
            }
          })
          if (res?.data) {
            setCurrentStep(1);
            set_id(res?.data?.data._id)
          } else {
            alert(res?.message)
          }
    };
    const handleSubmitFormStep1 = async (event: any) => {
        event.preventDefault();
        const res= await sendRequest<IBackendRes<any>>({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/api/v1/auth/verify`,
            body: {
                _id,
                verifyCode: event.target[0].value.trim()
            }
          })
          if (res?.data) {
            setCurrentStep(3);
          } else {
            alert(res?.message)
          }
    }
    const handleSubmitFormStep2 = async (event: any) => {
        event.preventDefault();
        setOpen(false);
    }
  const steps = [
    { label: "Kiểm tra email", subLabel: "01" },
    { label: "Xác thực", subLabel: "02" },
    { label: "Hoàn thành", subLabel: "03" },
  ];
  return (
    <Modal open={open}>
      <ModalDialog size="lg">
        <DialogTitle>Kích hoạt tài khoản</DialogTitle>
        <DialogContent>
          Để hoàn tất quá trình đăng ký, vui lòng nhập mã kích hoạt được gửi tới
          email của bạn.
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
                  <Typography sx={{ fontSize: "sm", fontWeight: "normal" }}>
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
                <FormLabel>
                  Email đã đăng ký
                </FormLabel>
                <Input required value={email} disabled/>
              </FormControl>
              <Button type="submit">
                Gửi mã kích hoạt
              </Button>
            </Stack>
          </form>
        )}

        {currentStep === 1 && (
          <form onSubmit={handleSubmitFormStep1}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>
                  Mã kích hoạt
                </FormLabel>
                <Input required autoFocus />
              </FormControl>
              <Button type="submit">Kích hoạt tài khoản</Button>
            </Stack>
          </form>
        )}
        {currentStep === 3 && (
          <>
          <Typography level="h4" textAlign={'center'}>
            Kích hoạt tài khoản thành công. Bạn có thể đăng nhập ngay bây giờ.
          </Typography>
          <Button onClick={handleSubmitFormStep2}>Đóng</Button>
          </>
        )}
      </ModalDialog>
    </Modal>
  );
}
