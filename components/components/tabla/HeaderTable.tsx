"use client";

import { Box, Checkbox, Typography } from "@mui/material";
import { useState } from "react";

interface HeaderColumn {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
  width?: number | string;
}

interface HeaderTableProps {
  columns: HeaderColumn[];
  selectable?: boolean;
}

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
        width:"100%",
        display: "grid",
        gridTemplateColumns: `
          ${selectable ? "48px" : ""}
          ${columns.map(c => c.width || "1fr").join(" ")}
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
        <Checkbox
          checked={allSelected}
          onChange={(e) => handleSelectAll(e.target.checked)}
        />
      )}

      {/* Títulos */}
      {columns.map((col) => (
        <Typography
          key={col.key}
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            textAlign: col.align || "left",
          }}
        >
          {col.label}
        </Typography>
      ))}
    </Box>
  );
}
