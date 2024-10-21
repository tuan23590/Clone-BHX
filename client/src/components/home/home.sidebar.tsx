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
import React from "react";
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
    }[];
  }[];
};

export default function HomeSidebar({ categories }: HomeSidebarProps) {
  return (
    <Box sx={{
      overflow: "auto", height: "90vh",
      width: "100%",
      padding: 2,
      border: "1px solid",
      borderColor: "divider",
    }}>
      {categories.map((category) => (
        <Box key={category._id}>
          <Toggler
            renderToggle={({ open, setOpen }) => (
              <ListItemButton onClick={() => setOpen(!open)}>
                <ListItemContent>
                  <Typography level="title-lg">{category.name}</Typography>
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
                  ]}
                />
              </ListItemButton>
            )}
          >
            <List sx={{ gap: 0.5 }}>
              {category.subCategories.map((subCategory) => (
                <ListItem key={subCategory._id}>
                  <ListItemButton>
                    <Link href={`#`} sx={{
                      color: "inherit",
                      textDecoration: "none !important",
                    }}>
                      {subCategory.name}
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
