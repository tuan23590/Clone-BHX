"use client";

import {
  Box,
  Button,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  Typography,
} from "@mui/joy";
import React, { useContext, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Toggler from "../Toggler";
import { AppContext } from "@/context/AppProvider";
import HomeIcon from '@mui/icons-material/Home';
import CloseIcon from '@mui/icons-material/Close';
type HomeSidebarProps = {
  categories: {
    _id: string;
    name: string;
    description: string;
    image: string;
    subCategories: {
      _id: string;
      name: string;
      description: string;
      image: string;
      products: any[]
    }[];
  }[];
};

export default function HomeSidebar({ categories }: HomeSidebarProps) {
  const [cate, setCate] = React.useState<any[]>([]);
  const {openSidebar,setOpenSidebar} = useContext(AppContext);
  const isPhone = window.innerWidth < 600;
  useEffect(() => {
    setCate(categories);
    if(window.innerWidth < 600){
      setOpenSidebar(false);
    }
  }, []);
  const sidebar = (
    <Box sx={{
      maxHeight: "90vh", overflowX: "auto", width: '100%',
      scrollbarWidth: "thin",
      border: "1px solid",
      borderColor: "divider",
      backgroundColor: 'white',
    }}>
      {isPhone && (
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
      }}>
        <Link href="/" underline="none">
          <Button sx={{width: "100%", justifyContent: "flex-start"}} color="success" variant="outlined">
            <HomeIcon sx={{fontSize: "1.5rem"}} />
            <Typography>Trang chủ</Typography>
          </Button>
        </Link>
        <Link underline="none">
          <Button sx={{width: "100%", justifyContent: "flex-start"}} color="warning" variant="outlined" onClick={() => setOpenSidebar(false)}>
            <CloseIcon sx={{fontSize: "1.5rem"}} />
            <Typography>Đóng</Typography>
          </Button>
        </Link>
      </Box>
      )}
      {categories && cate.map((category: any) => (
        <Box key={category._id} sx={{borderBottom: "1px solid", borderColor: "divider"}}>
          <Toggler
            renderToggle={({ open, setOpen }) => (
              <ListItemButton onClick={() => setOpen(!open)} sx={{padding: 1}}>
                <ListItemContent>
                  <Typography sx={{
                    fontWeight: "bold",
                    fontSize: "0.8rem",
                  }}>{category.name.toUpperCase()}</Typography>
                </ListItemContent>
                <KeyboardArrowDownIcon
                  sx={[
                    open
                      ? {
                          transform: "rotate(180deg)",
                        }
                      : {
                          transform: "none",
                        },
                  ]
                }
                  
                />
              </ListItemButton>
            )}
          >
            <List sx={{ gap: 0.5, 
              padding: 0,
              "& .MuiListItem-root": {
                padding: 0,
              },
             }}>
              {category?.subCategories.map((subCategory: any) => (
                <ListItem key={subCategory._id}>
                  <ListItemButton>
                    <Link href={`/${subCategory._id}`} 
                    sx={{
                      color: "inherit",
                      textDecoration: "none !important",
                      display: "flex",
                      width: "100%",
                    }}>
                      <Typography pl={1} level="body-sm">{subCategory.name} ({subCategory.products.length} sản phẩm)</Typography>
                    </Link>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Toggler>
        </Box>
      ))}
    </Box>
  );

  const toggleDrawer =
    (inOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setOpenSidebar(inOpen);
    };
  return (
    <Box>
      {isPhone ? (
      <Drawer open={openSidebar} onClose={toggleDrawer(false)}>
        {sidebar}
      </Drawer>
      ) : (
          sidebar
      )}
    </Box>
  );
}
