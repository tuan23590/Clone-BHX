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
import React, { useContext, useState } from "react";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { sendRequest } from "@/utils/api";
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import { AppContext } from "@/context/AppProvider";


type ModalForgotPasswordProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
};

export default function ModalForgotPassword({
  open,
  setOpen,
  email,
}: ModalForgotPasswordProps) {
  const {openSnackbar} = useContext(AppContext);
  const [currentStep, setCurrentStep] = useState(0);
  const [_id, set_id] = useState("");
  const [userEmail, setUserEmail] = useState(email);
    const handleSubmitFormStep0 = async (event: any) => {
        event.preventDefault();
        const res= await sendRequest<IBackendRes<any>>({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/api/v1/auth/resend-code`,
            body: {
              email: event.target[0].value.trim(),
            }
          })
          if (res?.data) {
            setCurrentStep(1);
            set_id(res?.data?.data._id)
            openSnackbar({message: 'Mã xác thực đã được gửi đến email của bạn', color: 'neutral'})
          } else {
            openSnackbar({message: res?.message, color: 'danger'})
          }
    };
    const handleSubmitFormStep1 = async (event: any) => {
        event.preventDefault();
        const res= await sendRequest<IBackendRes<any>>({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_AUTH_DOMAIN}/api/v1/auth/forgot-password`,
            body: {
                _id,
                verifyCode: event.target[0].value.trim(),
                password: event.target[1].value.trim(),
                confirmPassword: event.target[2].value.trim(),
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
        <DialogTitle sx={{
            display: 'flex',
            justifyContent: 'space-between',
        }}>
            <Typography level="h3">
                Đặt lại mật khẩu
                </Typography>
            <CloseIcon sx={{
                cursor: 'pointer',
                padding: 1,
                borderRadius: '20%',
                width: '40px',
                height: '40px',
                ':hover':{
                    backgroundColor: '#eeeeee'
                }
            }} onClick={() => {setOpen(false)
            }} />
        </DialogTitle>
        <DialogContent>
            Để đặt lại mật khẩu, vui lòng nhập mã xác thực và mật khẩu mới.
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
                  <Typography sx={{ fontSize: "sm", fontWeight: "normal", marginTop:'1px' }}>
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
                <Input required defaultValue={email} autoFocus type="email" startDecorator={<EmailIcon/>}/>
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
                  Mã xác thực
                </FormLabel>
                <Input required autoFocus />
              </FormControl>
                <FormControl>
                    <FormLabel>Mật khẩu mới</FormLabel>
                    <Input required type="password" />
                </FormControl>
                <FormControl>
                    <FormLabel>Nhập lại mật khẩu mới</FormLabel>
                    <Input required type="password" />
                </FormControl>
              <Button type="submit">
                Đặt lại mật khẩu
              </Button>
            </Stack>
          </form>
        )}
        {currentStep === 3 && (
          <>
          <Typography level="h4" textAlign={'center'}>
            Đặt lại mật khẩu thành công. Bạn có thể đăng nhập ngay bây giờ.
          </Typography>
          <Button onClick={handleSubmitFormStep2}>Đóng</Button>
          </>
        )}
      </ModalDialog>
    </Modal>
  );
}
