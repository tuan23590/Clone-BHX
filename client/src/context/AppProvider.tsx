"use client";
import { Snackbar, SnackbarProps } from "@mui/joy";
import React, { createContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export const AppContext = createContext({
  openSnackbar: (params: {
    message: string;
    color: SnackbarProps["color"];
  }) => {},
});

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");
  const [color, setColor] = React.useState<SnackbarProps["color"]>("neutral");
  const [left, setLeft] = React.useState<undefined | number>();
  const timer = React.useRef<ReturnType<typeof setInterval> | undefined>(
    undefined
  );
  const countdown = () => {
    timer.current = setInterval(() => {
      setLeft((prev) => (prev === undefined ? prev : Math.max(0, prev - 100)));
    }, 100);
  };
  const handlePause = () => {
    window.clearInterval(timer.current);
  };
  const handleResume = () => {
    countdown();
  };
  const openSnackbar = ({
    message,
    color,
  }: {
    message: string;
    color: SnackbarProps["color"];
  }) => {
    setLeft(5000);
    setMessage(message);
    setColor(color);
    setOpen(true);
  };
  return (
    <AppContext.Provider value={{ openSnackbar }}>
      <Snackbar
        variant="solid"
        color={color}
        autoHideDuration={left}
        onMouseEnter={handlePause}
        onMouseLeave={handleResume}
        onFocus={handlePause}
        onBlur={handleResume}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        onClose={(event, reason) => {
          if (reason === "clickaway") {
            return;
          } else {
            setOpen(false);
          }
        }}
        endDecorator={
          <CloseIcon
            onClick={() => setOpen(false)}
            sx={{
              cursor: "pointer",
              ":hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
                transform: "scale(1.1)",
              },
            }}
          />
        }
        startDecorator={
          color === "success" ? (
            <CheckCircleOutlineIcon />
          ) : color === "danger" ? (
            <ErrorOutlineIcon />
          ) : (
            <InfoOutlinedIcon />
          )
        }
      >
        {message}
      </Snackbar>
      {children}
    </AppContext.Provider>
  );
}
