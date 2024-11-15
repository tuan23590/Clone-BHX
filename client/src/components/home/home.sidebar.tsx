"use client";

import {
  Box,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  Typography,
} from "@mui/joy";
import React, { useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Toggler from "../Toggler";

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
  useEffect(() => {
    setCate(categories);
  }, []);
  return (
    <Box sx={{
      maxHeight: "90vh", overflowX: "auto", width: '100%',
      scrollbarWidth: "thin",
      border: "1px solid",
      borderColor: "divider",
      backgroundColor: 'white',
    }}>
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
}
