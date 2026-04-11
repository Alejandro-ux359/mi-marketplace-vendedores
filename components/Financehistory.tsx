"use client";

import React, { useRef, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Chip,
  ClickAwayListener,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import type { PaymentCardProps } from "./Paymentcard";

// ── Tipos ────────────────────────────────────────────────────────────────────

export type TransactionType = "ingreso" | "egreso" | "neutro";

export interface Transaction {
  [key: string]: unknown;
  id: string;
  fecha: string;
  descripcion: string;
  categoria: string;
  tipo: TransactionType;
  monto: number;
  /** ID de la cuenta origen (coincide con PaymentCard.bankName o un id) */
  cuentaId?: string;
}

export interface FinanceHistoryProps {
  rows?: Transaction[];
  /** Lista de cuentas registradas — se usan para el dropdown del tab */
  cuentas?: Pick<PaymentCardProps, "bankName" | "brand" | "last4">[];
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
  prefix?: string;
  onRowClick?: (row: Transaction) => void;
}

// ── Datos demo ───────────────────────────────────────────────────────────────

const DEMO_ROWS: Transaction[] = [
  { id: "001", fecha: "2025-04-30", descripcion: "Venta — Laptop Gaming Pro",   categoria: "Ventas",    tipo: "ingreso", monto: 1250,  cuentaId: "PayPal"     },
  { id: "002", fecha: "2025-04-29", descripcion: "Compra stock — Smartphones",  categoria: "Compras",   tipo: "egreso",  monto: -3400, cuentaId: "Visa"       },
  { id: "003", fecha: "2025-04-28", descripcion: "Comisión plataforma",          categoria: "Comisión",  tipo: "egreso",  monto: -87,   cuentaId: "Stripe"     },
  { id: "004", fecha: "2025-04-27", descripcion: "Venta — Monitor 4K",          categoria: "Ventas",    tipo: "ingreso", monto: 620,   cuentaId: "PayPal"     },
  { id: "005", fecha: "2025-04-26", descripcion: "Reembolso cliente #304",       categoria: "Devolución",tipo: "neutro",  monto: -150,  cuentaId: "Mastercard" },
  { id: "006", fecha: "2025-04-25", descripcion: "Venta — Teclado + Mouse",     categoria: "Ventas",    tipo: "ingreso", monto: 185,   cuentaId: "PayPal"     },
  { id: "007", fecha: "2025-04-24", descripcion: "Pago mensajería express",      categoria: "Logística", tipo: "egreso",  monto: -220,  cuentaId: "Visa"       },
  { id: "008", fecha: "2025-04-23", descripcion: "Venta — Webcam Full HD",      categoria: "Ventas",    tipo: "ingreso", monto: 340,   cuentaId: "Stripe"     },
  { id: "009", fecha: "2025-04-22", descripcion: "Mantenimiento servidor",       categoria: "Operación", tipo: "neutro",  monto: -60,   cuentaId: "Stripe"     },
  { id: "010", fecha: "2025-04-21", descripcion: "Venta — Hub USB-C",           categoria: "Ventas",    tipo: "ingreso", monto: 95,    cuentaId: "PayPal"     },
];

const DEMO_CUENTAS: Pick<PaymentCardProps, "bankName" | "brand" | "last4">[] = [
  { bankName: "PayPal",     brand: "paypal"     },
  { bankName: "Visa",       brand: "visa",       last4: "4242" },
  { bankName: "Mastercard", brand: "mastercard", last4: "8881" },
  { bankName: "Stripe",     brand: "stripe"     },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

const TIPO_CFG: Record<TransactionType, { label: string; bg: string }> = {
  ingreso: { label: "Ingreso", bg: "#10b981" },
  egreso:  { label: "Egreso",  bg: "#ef4444" },
  neutro:  { label: "Neutro",  bg: "#6b7280" },
};

const BRAND_DOT: Record<string, string> = {
  paypal:     "#009cde",
  visa:       "#1a1f71",
  mastercard: "#eb001b",
  amex:       "#007bc1",
  stripe:     "#635bff",
  efectivo:   "#16a34a",
  otro:       "#6b7280",
};

/**
 * FinanceHistory — tabla de historial con:
 * - Checkbox de selección múltiple
 * - Tab "Tarjetas" que abre un dropdown con las cuentas registradas
 * - Filtrado por cuenta al seleccionar en el dropdown
 *
 * @example
 * <FinanceHistory
 *   rows={transacciones}
 *   cuentas={misMetodosDePago}
 *   prefix="$"
 * />
 */
export const FinanceHistory: React.FC<FinanceHistoryProps> = ({
  rows = DEMO_ROWS,
  cuentas = DEMO_CUENTAS,
  rowsPerPageOptions = [10, 20, 50],
  defaultRowsPerPage = 10,
  prefix = "$",
  onRowClick,
}) => {
  const theme = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCuenta, setSelectedCuenta] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const anchorRef = useRef<HTMLDivElement>(null);

  // Filtrar filas por cuenta seleccionada
  const filtered = selectedCuenta
    ? rows.filter((r) => r.cuentaId === selectedCuenta)
    : rows;

  const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const allSelected = paginated.length > 0 && paginated.every((r) => selected.has(r.id));

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (allSelected) {
      setSelected((prev) => { const n = new Set(prev); paginated.forEach((r) => n.delete(r.id)); return n; });
    } else {
      setSelected((prev) => { const n = new Set(prev); paginated.forEach((r) => n.add(r.id)); return n; });
    }
  };

  const handleSelectCuenta = (name: string | null) => {
    setSelectedCuenta(name);
    setDropdownOpen(false);
    setPage(0);
  };

  return (
    <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider", overflow: "visible" }}>

      {/* ── Cabecera ─────────────────────────────────────────────────── */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          px: 2, py: 1,
          borderBottom: "1px solid", borderColor: "divider",
          bgcolor: "background.paper",
          borderRadius: "12px 12px 0 0",
          flexWrap: "wrap",
          gap: 1,
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Izquierda: checkbox + título */}
        <Box display="flex" alignItems="center" gap={1}>
          <Checkbox
            size="small"
            indeterminate={selected.size > 0 && !allSelected}
            checked={allSelected}
            onChange={toggleAll}
          />
          <Typography variant="subtitle2" fontWeight={600}>
            Historial
            {selectedCuenta && (
              <Typography component="span" variant="caption" color="text.secondary" ml={1}>
                — {selectedCuenta}
              </Typography>
            )}
            {selected.size > 0 && (
              <Typography component="span" variant="caption" color="text.secondary" ml={1}>
                ({selected.size} sel.)
              </Typography>
            )}
          </Typography>
        </Box>

        {/* Derecha: ícono verificado + tab "Tarjetas" con dropdown */}
        <Box display="flex" alignItems="center" gap={1} position="relative">
          <CheckCircleIcon sx={{ color: "success.main", fontSize: 22 }} />

          {/* Tab Tarjetas */}
          <Box
            ref={anchorRef}
            onClick={() => setDropdownOpen((o) => !o)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              px: 2,
              py: 0.6,
              borderRadius: 5,
              cursor: "pointer",
              bgcolor: dropdownOpen || selectedCuenta ? "primary.main" : "action.hover",
              color: dropdownOpen || selectedCuenta ? "primary.contrastText" : "text.primary",
              fontWeight: 600,
              fontSize: 13,
              userSelect: "none",
              transition: "background .15s",
              "&:hover": {
                bgcolor: dropdownOpen || selectedCuenta ? "primary.dark" : "action.selected",
              },
            }}
          >
            <CreditCardIcon sx={{ fontSize: 15 }} />
            Tarjetas
            <KeyboardArrowDownIcon
              sx={{
                fontSize: 16,
                transition: "transform .2s",
                transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </Box>

          {/* ── Dropdown ─────────────────────────────────────────────── */}
          {dropdownOpen && (
            <ClickAwayListener onClickAway={() => setDropdownOpen(false)}>
              <Paper
                elevation={8}
                sx={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  right: 0,
                  minWidth: 220,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  overflow: "hidden",
                  zIndex: 1300,
                }}
              >
                {/* Opción: todas las cuentas */}
                <Box
                  onClick={() => handleSelectCuenta(null)}
                  sx={{
                    px: 2, py: 1.2,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.2,
                    bgcolor: selectedCuenta === null ? "action.selected" : "transparent",
                    fontWeight: selectedCuenta === null ? 700 : 400,
                    fontSize: 13,
                    color: "text.primary",
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <Box
                    sx={{
                      width: 10, height: 10, borderRadius: "50%",
                      bgcolor: "text.disabled", flexShrink: 0,
                    }}
                  />
                  Todas las cuentas
                </Box>

                <Divider />

                {/* Cuentas registradas */}
                {cuentas.map((c) => {
                  const dot = BRAND_DOT[(c.brand ?? "otro").toLowerCase()] ?? BRAND_DOT.otro;
                  const isActive = selectedCuenta === c.bankName;
                  return (
                    <Box
                      key={c.bankName}
                      onClick={() => handleSelectCuenta(c.bankName)}
                      sx={{
                        px: 2, py: 1.2,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 1.2,
                        bgcolor: isActive ? "action.selected" : "transparent",
                        "&:hover": { bgcolor: "action.hover" },
                      }}
                    >
                      {/* Punto de color de la marca */}
                      <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: dot, flexShrink: 0 }} />

                      <Box flex={1}>
                        <Typography variant="body2" fontWeight={isActive ? 700 : 500} lineHeight={1.2}>
                          {c.bankName}
                        </Typography>
                        {c.last4 && (
                          <Typography variant="caption" color="text.secondary">
                            •••• {c.last4}
                          </Typography>
                        )}
                      </Box>

                      {isActive && (
                        <CheckCircleIcon sx={{ fontSize: 16, color: "primary.main" }} />
                      )}
                    </Box>
                  );
                })}
              </Paper>
            </ClickAwayListener>
          )}
        </Box>
      </Box>

      {/* ── Tabla ─────────────────────────────────────────────────────── */}
      <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: "action.hover" }}>
                <TableCell padding="checkbox" sx={{ pl: 2 }}>
                  <Checkbox size="small" indeterminate={selected.size > 0 && !allSelected} checked={allSelected} onChange={toggleAll} />
                </TableCell>
                {["Fecha", "Descripción", "Categoría", "Tipo", "Monto"].map((col) => (
                  <TableCell
                    key={col}
                    align={col === "Monto" ? "right" : "left"}
                    sx={{ fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, color: "text.secondary", py: 1.2, whiteSpace: "nowrap" }}
                  >
                    {col}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {paginated.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                    <Typography variant="body2" color="text.secondary">Sin transacciones</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                paginated.map((row) => {
                  const cfg = TIPO_CFG[row.tipo];
                  return (
                    <TableRow
                      key={row.id}
                      hover
                      selected={selected.has(row.id)}
                      onClick={() => onRowClick?.(row)}
                      sx={{ cursor: onRowClick ? "pointer" : "default", "&:last-child td": { border: 0 } }}
                    >
                      <TableCell padding="checkbox" sx={{ pl: 2 }}>
                        <Checkbox size="small" checked={selected.has(row.id)} onChange={() => toggleSelect(row.id)} onClick={(e) => e.stopPropagation()} />
                      </TableCell>
                      <TableCell sx={{ fontSize: 13, color: "text.secondary", whiteSpace: "nowrap" }}>{row.fecha}</TableCell>
                      <TableCell sx={{ fontSize: 13 }}>{row.descripcion}</TableCell>
                      <TableCell sx={{ fontSize: 13 }}>{row.categoria}</TableCell>
                      <TableCell>
                        <Chip label={cfg.label} size="small" sx={{ bgcolor: cfg.bg, color: "#fff", fontWeight: 700, fontSize: 11 }} />
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          fontSize: 13, fontWeight: 700, whiteSpace: "nowrap",
                          color: row.tipo === "ingreso" ? "success.main" : row.tipo === "egreso" ? "error.main" : "text.secondary",
                        }}
                      >
                        {row.monto > 0 ? "+" : ""}{prefix}{Math.abs(row.monto).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box display="flex" justifyContent="flex-end" px={2} py={0.5} borderTop={`1px solid ${theme.palette.divider}`}>
          <TablePagination
            component="div"
            count={filtered.length}
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
};