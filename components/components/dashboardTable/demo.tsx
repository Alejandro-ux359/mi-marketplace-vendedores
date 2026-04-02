import type {
  KpiCardProps,
  SparklineCardProps,
  BarChartCardProps,
  TableColumn,
  DonutChartProps,
  NavTreeProps,
} from "../types/dashboard";
import { Chip } from "@mui/material";
import React from "react";

// ─── KPIs ─────────────────────────────────────────────────────────────────────
export const kpisDemo: KpiCardProps[] = [
  {
    title: "Ventas totales",
    value: "$48,320",
    trend: 25,
    trendLabel: "vs. mes anterior",
    color: "success",
  },
  {
    title: "Pedidos",
    value: "1,245",
    trend: -8,
    trendLabel: "vs. mes anterior",
    color: "error",
  },
  {
    title: "Clientes nuevos",
    value: "384",
    trend: 12,
    trendLabel: "vs. mes anterior",
    color: "primary",
  },
  {
    title: "Ticket promedio",
    value: "$38.80",
    trend: 5,
    trendLabel: "vs. mes anterior",
    color: "warning",
  },
];

// ─── Sparkline (Sesiones/Visitas) ─────────────────────────────────────────────
export const sessionsDemo: SparklineCardProps = {
  title: "Visitas a la tienda",
  value: "13,277",
  trend: 32,
  trendLabel: "Últimos 30 días",
  color: "#2196f3",
  data: [
    { label: "Abr 1", value: 4200 },
    { label: "Abr 5", value: 5800 },
    { label: "Abr 10", value: 5100 },
    { label: "Abr 15", value: 9200 },
    { label: "Abr 20", value: 8400 },
    { label: "Abr 25", value: 11300 },
    { label: "Abr 30", value: 13277 },
  ],
};

// ─── Bar Chart (Ingresos mensuales) ───────────────────────────────────────────
export const pageViewsDemo: BarChartCardProps = {
  title: "Ingresos y pedidos mensuales",
  value: "$312K",
  trend: -4,
  trendLabel: "vs. periodo anterior",
  color: "#1565c0",
  secondaryColor: "#42a5f5",
  prefix: "$",
  seriesLabel: "Ingresos",
  secondarySeriesLabel: "Costo",
  data: [
    { label: "Ene", value: 38000, secondaryValue: 18000 },
    { label: "Feb", value: 42000, secondaryValue: 20000 },
    { label: "Mar", value: 51000, secondaryValue: 22000 },
    { label: "Abr", value: 47000, secondaryValue: 21000 },
    { label: "May", value: 60000, secondaryValue: 27000 },
    { label: "Jun", value: 74000, secondaryValue: 31000 },
  ],
};

// ─── Table ────────────────────────────────────────────────────────────────────
export interface ProductRow {
  nombre: string;
  estado: string;
  usuarios: number;
  ventas: number;
  vistasUsuario: number;
  tiempoPromedio: string;
}

export const tableColumnsDemo: TableColumn<ProductRow>[] = [
  {
    key: "nombre",
    label: "Producto",
    width: "28%",
  },
  {
    key: "estado",
    label: "Estado",
    width: 90,
    renderCell: (v) =>
      React.createElement(
        Chip,
        {
          label: v as string,
          size: "small",
          sx: {
            bgcolor: v === "Activo" ? "success.main" : "default",
            color: v === "Activo" ? "#fff" : "text.secondary",
            fontWeight: 600,
            fontSize: 11,
          },
        }
      ),
  },
  { key: "usuarios", label: "Usuarios", align: "right" },
  { key: "ventas", label: "Ventas ($)", align: "right" },
  { key: "vistasUsuario", label: "Vistas/usuario", align: "right" },
  { key: "tiempoPromedio", label: "T. promedio", align: "right" },
];

export const tableRowsDemo: ProductRow[] = [
  { nombre: "Laptop Gaming Pro X1", estado: "Activo", usuarios: 21243, ventas: 8345, vistasUsuario: 18.5, tiempoPromedio: "2m 10s" },
  { nombre: "Smartphone Ultra 15", estado: "Activo", usuarios: 17224, ventas: 5853, vistasUsuario: 9.7, tiempoPromedio: "2m 30s" },
  { nombre: "Auriculares BT Max", estado: "Inactivo", usuarios: 5824, ventas: 3455, vistasUsuario: 15.3, tiempoPromedio: "2m 10s" },
  { nombre: "Monitor 4K ProView", estado: "Activo", usuarios: 9624, ventas: 11265, vistasUsuario: 4.5, tiempoPromedio: "2m 40s" },
  { nombre: "Teclado Mecánico RGB", estado: "Activo", usuarios: 16724, ventas: 3853, vistasUsuario: 3.1, tiempoPromedio: "2m 55s" },
  { nombre: "Webcam Full HD 1080", estado: "Activo", usuarios: 19245, ventas: 10854, vistasUsuario: 7.2, tiempoPromedio: "2m 20s" },
  { nombre: "Mouse Ergonómico Pro", estado: "Inactivo", usuarios: 3224, ventas: 7853, vistasUsuario: 6.5, tiempoPromedio: "2m 50s" },
  { nombre: "Disco SSD 2TB NVMe", estado: "Activo", usuarios: 4824, ventas: 8583, vistasUsuario: 4.3, tiempoPromedio: "3m 10s" },
  { nombre: "Router WiFi 6 Mesh", estado: "Inactivo", usuarios: 1824, ventas: 4583, vistasUsuario: 2.7, tiempoPromedio: "3m 25s" },
  { nombre: "Tablet Android 12\"", estado: "Activo", usuarios: 2824, ventas: 9853, vistasUsuario: 5.1, tiempoPromedio: "3m 05s" },
  { nombre: "Impresora Láser Color", estado: "Activo", usuarios: 2424, ventas: 6583, vistasUsuario: 4.8, tiempoPromedio: "3m 15s" },
  { nombre: "Cable USB-C PD 240W", estado: "Inactivo", usuarios: 3624, ventas: 12353, vistasUsuario: 3.5, tiempoPromedio: "3m 20s" },
  { nombre: "Soporte Laptop Aluminio", estado: "Activo", usuarios: 1324, ventas: 5883, vistasUsuario: 2.3, tiempoPromedio: "3m 30s" },
  { nombre: "Hub USB-C 10 puertos", estado: "Inactivo", usuarios: 1824, ventas: 7853, vistasUsuario: 3.2, tiempoPromedio: "3m 15s" },
  { nombre: "Cámara Mirrorless 32MP", estado: "Activo", usuarios: 2424, ventas: 9583, vistasUsuario: 2.5, tiempoPromedio: "3m 35s" },
];

// ─── Donut ────────────────────────────────────────────────────────────────────
export const donutDemo: DonutChartProps = {
  title: "Ventas por país",
  total: "98.5K",
  totalLabel: "Total",
  segments: [
    { label: "México", value: 50, color: "#e53935" },
    { label: "USA", value: 35, color: "#1976d2" },
    { label: "Colombia", value: 10, color: "#43a047" },
    { label: "Otro", value: 5, color: "#757575" },
  ],
};

// ─── NavTree ──────────────────────────────────────────────────────────────────
export const navTreeDemo: NavTreeProps = {
  title: "Catálogo",
  items: [
    {
      label: "Tienda",
      children: [
        { label: "Inicio", href: "/" },
        {
          label: "Categorías",
          children: [
            { label: "Laptops", href: "/laptops" },
            { label: "Smartphones", href: "/smartphones" },
            { label: "Accesorios", href: "/accesorios" },
          ],
        },
        { label: "Ofertas", href: "/ofertas" },
        { label: "Nuevos", href: "/nuevos" },
      ],
    },
    {
      label: "Soporte",
      children: [
        { label: "Contacto", href: "/contacto" },
        { label: "FAQ", href: "/faq" },
        { label: "Devoluciones", href: "/devoluciones" },
      ],
    },
  ],
};
