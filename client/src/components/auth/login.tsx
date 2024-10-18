"use client";
import React, { useContext, useState } from 'react';
import { CssVarsProvider, extendTheme, useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import GoogleIcon from '../../Public/GoogleIcon';
import { useRouter } from 'next/navigation';
import { authenticate } from '@/action/authAction';
import ModalReactive from './modal.reactive';
import ModalForgotPassword from './modal.forgotPassword';
import ModalRegister from './modal.register';
import { AppContext } from '@/context/AppProvider';


interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}
function ColorSchemeToggle(props: IconButtonProps) {
  const { onClick, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return (
    <IconButton
      aria-label="toggle light/dark mode"
      size="sm"
      variant="outlined"
      disabled={!mounted}
      onClick={(event) => {
        setMode(mode === 'light' ? 'dark' : 'light');
        onClick?.(event);
      }}
      {...other}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

const customTheme = extendTheme();

export default function LoginPageClient() {
  const {openSnackbar} = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [openVerify, setOpenVerify] = useState(false);
  const [openForgot, setOpenForgot] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const router = useRouter();
  const handleLogin = async (e : React.FormEvent<SignInFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.elements.email.value;
    const password = e.currentTarget.elements.password.value;
    const res = await authenticate(email, password);
    console.log(res);
    if (res?.error) {
      // alert(res.error);
      openSnackbar({ message: res.error, color: 'danger' });
      if (res.code === 2) {
        setOpenVerify(true);
      }
    } else {
      router.push("/dashboard");
    }
  };
  const handleLoginWithGoogle = async () => {
    // alert("Chức năng đang phát triển");
    openSnackbar({ message: 'Chức năng đang phát triển', color: 'warning' });
  }
  return (
   <>
    <CssVarsProvider theme={customTheme} disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ':root': {
            '--Form-maxWidth': '800px',
            '--Transition-duration': '0.4s', // set to `none` to disable transition
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width: { xs: '100%', md: '50vw' },
          transition: 'width var(--Transition-duration)',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255 255 255 / 0.2)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundColor: 'rgba(19 19 24 / 0.4)',
          },
        })}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100dvh',
            width: '100%',
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{ py: 3, display: 'flex', justifyContent: 'space-between' }}
          >
            <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
              <IconButton variant="soft" color="primary" size="sm">
                <BadgeRoundedIcon />
              </IconButton>
              <Typography level="title-lg">
                Hệ thống quản lý thực tập sinh
              </Typography>
            </Box>
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              my: 'auto',
              py: 2,
              pb: 5,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: 400,
              maxWidth: '100%',
              mx: 'auto',
              borderRadius: 'sm',
              '& form': {
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: 'hidden',
              },
            }}
          >
            <Stack sx={{ gap: 4, mb: 2 }}>
              <Stack sx={{ gap: 1 }}>
                <Typography component="h1" level="h3">
                  Đăng nhập
                </Typography>
                <Typography level="body-sm">
                  Bạn chưa có tài khoản?
                  {' '}
                  <Link level="title-sm" onClick={() => setOpenRegister(true)}>
                    Đăng ký tài khoản!
                  </Link>
                </Typography>
              </Stack>
              <Button
                variant="soft"
                color="neutral"
                fullWidth
                startDecorator={<GoogleIcon />}
                onClick={handleLoginWithGoogle}
              >
                Đăng nhập bằng Google
              </Button>
            </Stack>
            <Divider
              sx={(theme) => ({
                [theme.getColorSchemeSelector('light')]: {
                  color: { xs: '#FFF', md: 'text.tertiary' },
                },
              })}
            >
              Hoặc
            </Divider>
            <Stack sx={{ gap: 4, mt: 2 }}>
              <form
                onSubmit={handleLogin}
              >
                <FormControl required>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" name="email" onChange={(e) => setEmail(e.target.value)}/>
                </FormControl>
                <FormControl required>
                  <FormLabel>Mật khẩu</FormLabel>
                  <Input type="password" name="password" />
                </FormControl>
                <Stack sx={{ gap: 4, mt: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Checkbox size="sm" label="Lưu mật khẩu" name="persistent" />
                    <Link level="title-sm"
                    onClick={() => setOpenForgot(true)}
                    >
                      Quên mật khẩu?
                    </Link>
                  </Box>
                  <Button type="submit" fullWidth>
                    Đăng nhập
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" sx={{ textAlign: 'center' }}>
                    Quản lý thực tập sinh ©
             {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: '100%',
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: '50vw' },
          transition:
            'background-image var(--Transition-duration), left var(--Transition-duration) !important',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          backgroundColor: 'background.level1',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage:
            'url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundImage:
              'url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)',
          },
        })}
      />
    </CssVarsProvider>
    <ModalReactive open={openVerify} setOpen={setOpenVerify} email={email} />
    <ModalForgotPassword open={openForgot} setOpen={setOpenForgot} email={email} />
    <ModalRegister open={openRegister} setOpen={setOpenRegister} />
   </>
  );
}