"use client";

import { Box, List, ListItem, ListItemButton, ListItemContent, Typography } from "@mui/joy";
import React from "react";
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

type HomeSidebarProps = {
  categories: {
    _id: string;
    name: string;
    description: string;
    image: string;
  }[];
};


function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={[
          {
            display: 'grid',
            transition: '0.2s ease',
            '& > *': {
              overflow: 'hidden',
            },
          },
          open ? { gridTemplateRows: '1fr' } : { gridTemplateRows: '0fr' },
        ]}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}


export default function HomeSidebar({ categories }: HomeSidebarProps) {
  return (
    <Box sx={{ overflow: "auto", height: "100vh" }}>
      {categories.map((category) => (
        <Box key={category._id}>
          <img src={category.image} alt={category.name} width="20px" />
          <h3>{category.name}</h3>
        </Box>
      ))}
      <Toggler
        renderToggle={({ open, setOpen }) => (
          <ListItemButton onClick={() => setOpen(!open)}>
            <AssignmentRoundedIcon />
            <ListItemContent>
              <Typography level="title-sm">Tasks</Typography>
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
          <ListItem sx={{ mt: 0.5 }}>
            <ListItemButton>All tasks</ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>Backlog</ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>In progress</ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>Done</ListItemButton>
          </ListItem>
        </List>
      </Toggler>
    </Box>
  );
}
