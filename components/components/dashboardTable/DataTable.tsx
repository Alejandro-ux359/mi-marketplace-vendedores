"use client";

import React, { useState } from "react";
import {
  Box, Card, CardContent, CardHeader, Checkbox, Chip,
  CircularProgress, Table, TableBody, TableCell, TableContainer,
  TableHead, TablePagination, TableRow, Typography, useTheme,
} from "@mui/material";
import type { DataTableProps } from "../types/dashboard";

export function DataTable<T extends Record<string, unknown>>({
  title,
  columns,
  rows,
  rowsPerPageOptions = [10, 20, 50],
  defaultRowsPerPage = 10,
  onRowClick,
  loading = false,
}: DataTableProps<T>) {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const paginated = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const toggleSelect = (idx: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };

  const allOnPage = paginated.map((_, i) => page * rowsPerPage + i);
  const allSelected = allOnPage.length > 0 && allOnPage.every((i) => selected.has(i));
  const someSelected = allOnPage.some((i) => selected.has(i)) && !allSelected;

  const toggleAll = () => {
    if (allSelected) {
      setSelected((prev) => {
        const next = new Set(prev);
        allOnPage.forEach((i) => next.delete(i));
        return next;
      });
    } else {
      setSelected((prev) => {
        const next = new Set(prev);
        allOnPage.forEach((i) => next.add(i));
        return next;
      });
    }
  };

  return (
    <Card sx={{ borderRadius: 2, border: "1px solid", borderColor: "divider" }}>
      {title && (
        <CardHeader
          title={<Typography variant="subtitle1" fontWeight={600}>{title}</Typography>}
          sx={{ pb: 0 }}
        />
      )}
      <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: "action.hover" }}>
                <TableCell padding="checkbox" sx={{ pl: 2 }}>
                  <Checkbox
                    size="small"
                    indeterminate={someSelected}
                    checked={allSelected}
                    onChange={toggleAll}
                  />
                </TableCell>
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    align={col.align ?? "left"}
                    width={col.width}
                    sx={{
                      fontWeight: 700,
                      fontSize: 11,
                      color: "text.secondary",
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                      py: 1.2,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} align="center" sx={{ py: 6 }}>
                    <CircularProgress size={28} />
                  </TableCell>
                </TableRow>
              ) : paginated.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} align="center" sx={{ py: 6 }}>
                    <Typography variant="body2" color="text.secondary">Sin datos</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                paginated.map((row, rowIdx) => {
                  const globalIdx = page * rowsPerPage + rowIdx;
                  return (
                    <TableRow
                      key={globalIdx}
                      hover
                      selected={selected.has(globalIdx)}
                      onClick={() => onRowClick?.(row)}
                      sx={{
                        cursor: onRowClick ? "pointer" : "default",
                        "&:last-child td": { border: 0 },
                      }}
                    >
                      <TableCell padding="checkbox" sx={{ pl: 2 }}>
                        <Checkbox
                          size="small"
                          checked={selected.has(globalIdx)}
                          onChange={() => toggleSelect(globalIdx)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </TableCell>
                      {columns.map((col) => (
                        <TableCell key={col.key} align={col.align ?? "left"} sx={{ fontSize: 13, py: 1 }}>
                          {col.renderCell
                            ? col.renderCell(row[col.key], row)
                            : (row[col.key] as React.ReactNode) ?? "—"}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={2}
          py={0.5}
          borderTop={`1px solid ${theme.palette.divider}`}
        >
          <Typography variant="caption" color="text.secondary">
            {selected.size > 0 ? `${selected.size} seleccionado(s)` : ""}
          </Typography>
          <TablePagination
            component="div"
            count={rows.length}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={rowsPerPageOptions}
            onPageChange={(_, p) => setPage(p)}
            onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
            labelRowsPerPage="Filas:"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
            sx={{ "& .MuiTablePagination-toolbar": { minHeight: 40 } }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
