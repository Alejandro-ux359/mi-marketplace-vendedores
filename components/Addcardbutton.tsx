"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export interface AddCardButtonProps {
  label?: string;
  onClick?: () => void;
  minHeight?: number;
}

/**
 * AddCardButton — botón "+" para agregar nueva cuenta de pago.
 *
 * @example
 * <AddCardButton label="Nueva cuenta" onClick={() => setOpenModal(true)} />
 */
export const AddCardButton: React.FC<AddCardButtonProps> = ({
  label = "Nueva cuenta",
  onClick,
  minHeight = 110,
}) => (
  <Box
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => e.key === "Enter" && onClick?.()}
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 0.8,
      minWidth: 100,
      minHeight,
      borderRadius: 3,
      border: "2px dashed",
      borderColor: "divider",
      bgcolor: "transparent",
      cursor: "pointer",
      px: 2,
      transition: "border-color .2s, background .2s",
      "&:hover": {
        borderColor: "primary.main",
        bgcolor: "action.hover",
        "& .add-icon": { color: "primary.main", transform: "scale(1.15)" },
        "& .add-label": { color: "primary.main" },
      },
    }}
  >
    <Box
      className="add-icon"
      sx={{
        width: 40, height: 40, borderRadius: "50%",
        border: "2px solid", borderColor: "text.disabled",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "text.disabled", transition: "color .2s, transform .2s",
      }}
    >
      <AddIcon sx={{ fontSize: 22 }} />
    </Box>
    <Typography
      className="add-label"
      variant="caption"
      color="text.disabled"
      fontWeight={500}
      sx={{ transition: "color .2s", textAlign: "center" }}
    >
      {label}
    </Typography>
  </Box>
);