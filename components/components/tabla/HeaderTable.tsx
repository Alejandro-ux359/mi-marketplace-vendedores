"use client";

import { Box, Checkbox, Typography } from "@mui/material";
import { useState } from "react";
import { HeaderTableProps } from "./export";

export default function HeaderTable({
  columns,
  selectable = true,
}: HeaderTableProps) {
  const [allSelected, setAllSelected] = useState(false);

  const handleSelectAll = (checked: boolean) => {
    setAllSelected(checked);
    // aquí luego notificas al contexto / tabla
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: `
          ${selectable ? "48px" : ""}
          ${columns.map((c) => c.width || "1fr").join(" ")}
        `,
        alignItems: "center",
        px: 2,
        height: 56,
        borderBottom: "1px solid #eee",
        backgroundColor: "#fafafa",
      }}
    >
      {/* Checkbox selección */}
      {selectable && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            borderRight: "1px solid #e0e0e0",
          }}
        >
          <Checkbox
            checked={allSelected}
            onChange={(e) => handleSelectAll(e.target.checked)}
          />
        </Box>
      )}

      {/* Títulos */}
      {columns.map((col, index) => (
        <Typography
          key={col.key}
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            borderRight:
              index !== columns.length - 1 ? "1px solid #e0e0e0" : "none",
            textAlign: "center",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {col.label}
        </Typography>
      ))}
    </Box>
  );
}
