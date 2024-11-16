import { Box, Stack, IconButton } from "@mui/joy";
import React, { useEffect, useRef, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function SlideShow({ listImage }: { listImage: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [isPhone, setIsPhone] = React.useState(false);
  React.useEffect(() => {
    setIsPhone(window.innerWidth < 600);
  }, []);
  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 250; // Khoảng cách để cuộn mỗi lần
      scrollRef.current.scrollBy({
        top: 0,
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth);
    }
  };

  useEffect(() => {
    const current = scrollRef.current;
    current?.addEventListener("scroll", checkScrollPosition);
    checkScrollPosition(); // Kiểm tra vị trí ngay khi component được render

    return () => {
      current?.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  return (
    <Box>
      <Box
        width={"100%"}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 400,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            height: "20%",
          }}
          onClick={() => {
            if(currentIndex > 0) {
              setCurrentIndex((prev) => prev - 1);
            }else
              setCurrentIndex(listImage.length - 1);
          }}
        >
          <ArrowBackIcon color="success" />
        </IconButton>
        <IconButton
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            height: "20%",
          }}
          onClick={() => {
            if(currentIndex < listImage.length - 1) {
              setCurrentIndex((prev) => prev + 1);
            }else
              setCurrentIndex(0);
          }}
        >
          <ArrowForwardIcon color="success" />
        </IconButton>
        <img src={listImage[currentIndex]} alt="product" width={ isPhone ? "100%" : 400} />
      </Box>
      <Stack
        direction="row"
        sx={{
          position: "relative",
        }}
      >
        {!isAtStart && (
          <IconButton
            onClick={() => handleScroll("left")}
            sx={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              "&:hover": {
                backgroundColor: "#81c784",
              },
            }}
          >
            <ArrowBackIcon color="success" />
          </IconButton>
        )}

        <Box
          sx={{
            display: "flex",
            gap: "10px",
            overflow: "hidden",
            width: "100%",
          }}
          ref={scrollRef}
        >
          {listImage.map((image, index) => (
            <Box
              key={index}
              sx={{
                cursor: "pointer",
                borderRadius: 10,
                padding: "3px",
                border:
                  index === currentIndex
                    ? "2px solid #81c784"
                    : "2px solid gray",
                opacity: index === currentIndex ? 1 : 0.3,
                "&:hover": {
                  opacity: 1,
                  border: "2px solid #81c784",
                },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => setCurrentIndex(index)}
            >
              <img src={image} alt="product" width={isPhone ? 50 : 100} />
            </Box>
          ))}
        </Box>

        {!isAtEnd && (
          <IconButton
            onClick={() => handleScroll("right")}
            sx={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              "&:hover": {
                backgroundColor: "#81c784",
              },
            }}
          >
            <ArrowForwardIcon color="success" />
          </IconButton>
        )}
      </Stack>
    </Box>
  );
}
