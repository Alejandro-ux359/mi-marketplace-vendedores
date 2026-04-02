"use client";

import React, { useState } from "react";
import {
  Box, Card, CardContent, CardHeader, Collapse,
  List, ListItemButton, ListItemText, Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import type { NavItem, NavTreeProps } from "../types/dashboard";

const NavNode: React.FC<{
  item: NavItem;
  depth: number;
  activeHref?: string;
  onItemClick?: (item: NavItem) => void;
}> = ({ item, depth, activeHref, onItemClick }) => {
  const [open, setOpen] = useState(depth === 0);
  const hasChildren = !!item.children?.length;
  const isActive = item.href === activeHref;

  return (
    <>
      <ListItemButton
        selected={isActive}
        onClick={() => { if (hasChildren) setOpen((o) => !o); onItemClick?.(item); }}
        sx={{
          pl: 1 + depth * 1.5,
          py: 0.4,
          borderRadius: 1,
          mb: 0.2,
          "&.Mui-selected": {
            bgcolor: "primary.main",
            color: "primary.contrastText",
            "&:hover": { bgcolor: "primary.dark" },
          },
        }}
      >
        {!hasChildren && <FiberManualRecordIcon sx={{ fontSize: 7, mr: 1, opacity: 0.5 }} />}
        <ListItemText
          primary={item.label}
          primaryTypographyProps={{ fontSize: 13, fontWeight: isActive ? 700 : 400 }}
        />
        {hasChildren && (open ? <ExpandMoreIcon sx={{ fontSize: 16 }} /> : <ChevronRightIcon sx={{ fontSize: 16 }} />)}
      </ListItemButton>
      {hasChildren && (
        <Collapse in={open} timeout="auto">
          <List disablePadding>
            {item.children!.map((child, i) => (
              <NavNode key={i} item={child} depth={depth + 1} activeHref={activeHref} onItemClick={onItemClick} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export const NavTree: React.FC<NavTreeProps> = ({ title, items, activeHref, onItemClick }) => (
  <Card sx={{ borderRadius: 2, border: "1px solid", borderColor: "divider" }}>
    <CardHeader
      title={<Typography variant="subtitle1" fontWeight={600}>{title}</Typography>}
      sx={{ pb: 0 }}
    />
    <CardContent sx={{ pt: 1 }}>
      <List disablePadding dense>
        {items.map((item, i) => (
          <NavNode key={i} item={item} depth={0} activeHref={activeHref} onItemClick={onItemClick} />
        ))}
      </List>
    </CardContent>
  </Card>
);
