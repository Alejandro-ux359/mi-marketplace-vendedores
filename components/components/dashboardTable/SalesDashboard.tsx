"use client";

import React from "react";
import { Box, Chip, Grid, Typography, useTheme } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";

import { KpiCard } from "./KpiCard";
import { SparklineCard } from "./SparklineCard";
import { BarChartCard } from "./BarChartCard";
import { DataTable } from "./DataTable";
import { DonutChart } from "./DonutChart";
import { NavTree } from "./NavTree";

import type {
  KpiCardProps,
  SparklineCardProps,
  BarChartCardProps,
  TableColumn,
  DonutChartProps,
  NavTreeProps,
} from "../types/dashboard";

// ─────────────────────────────────────────────────────────────────────────────
// DATOS DEMO — reemplaza estos con los valores que lleguen de tu API
// ─────────────────────────────────────────────────────────────────────────────

const DEMO_KPIS: KpiCardProps[] = [
  { title: "Ventas totales",   value: "$48,320", trend: 25,  color: "success" },
  { title: "Pedidos",          value: "1,245",   trend: -8,  color: "error"   },
  { title: "Clientes nuevos",  value: "384",     trend: 12,  color: "primary" },
  { title: "Ticket promedio",  value: "$38.80",  trend: 5,   color: "warning" },
];

const DEMO_SESSIONS: SparklineCardProps = {
  title: "Visitas a la tienda",
  value: "13,277",
  trend: 32,
  trendLabel: "Últimos 30 días",
  color: "#2196f3",
  data: [
    { label: "Abr 1",  value: 4200  },
    { label: "Abr 5",  value: 5800  },
    { label: "Abr 10", value: 5100  },
    { label: "Abr 15", value: 9200  },
    { label: "Abr 20", value: 8400  },
    { label: "Abr 25", value: 11300 },
    { label: "Abr 30", value: 13277 },
  ],
};

const DEMO_BAR: BarChartCardProps = {
  title: "Ingresos y costos mensuales",
  value: "$312K",
  trend: -4,
  trendLabel: "vs. periodo anterior",
  color: "#1565c0",
  secondaryColor: "#42a5f5",
  prefix: "$",
  seriesLabel: "Ingresos",
  secondarySeriesLabel: "Costos",
  data: [
    { label: "Ene", value: 38000, secondaryValue: 18000 },
    { label: "Feb", value: 42000, secondaryValue: 20000 },
    { label: "Mar", value: 51000, secondaryValue: 22000 },
    { label: "Abr", value: 47000, secondaryValue: 21000 },
    { label: "May", value: 60000, secondaryValue: 27000 },
    { label: "Jun", value: 74000, secondaryValue: 31000 },
  ],
};

interface ProductRow {
  nombre: string;
  estado: string;
  usuarios: number;
  ventas: number;
  vistasUsuario: number;
  tiempoPromedio: string;
}

const DEMO_COLUMNS: TableColumn<ProductRow>[] = [
  { key: "nombre",        label: "Producto",       width: "30%" },
  {
    key: "estado",
    label: "Estado",
    width: 90,
    renderCell: (v) => (
      <Chip
        label={v as string}
        size="small"
        sx={{
          bgcolor: v === "Activo" ? "success.main" : "action.disabledBackground",
          color:   v === "Activo" ? "#fff"         : "text.secondary",
          fontWeight: 600,
          fontSize: 11,
        }}
      />
    ),
  },
  { key: "usuarios",      label: "Usuarios",        align: "right" },
  { key: "ventas",        label: "Ventas ($)",       align: "right" },
  { key: "vistasUsuario", label: "Vistas/usuario",  align: "right" },
  { key: "tiempoPromedio",label: "T. promedio",     align: "right" },
];

const DEMO_ROWS: ProductRow[] = [
  { nombre: "Laptop Gaming Pro X1",        estado: "Activo",   usuarios: 21243, ventas: 8345,  vistasUsuario: 18.5, tiempoPromedio: "2m 10s" },
  { nombre: "Smartphone Ultra 15",          estado: "Activo",   usuarios: 17224, ventas: 5853,  vistasUsuario: 9.7,  tiempoPromedio: "2m 30s" },
  { nombre: "Auriculares BT Max",           estado: "Inactivo", usuarios:  5824, ventas: 3455,  vistasUsuario: 15.3, tiempoPromedio: "2m 10s" },
  { nombre: "Monitor 4K ProView",           estado: "Activo",   usuarios:  9624, ventas: 11265, vistasUsuario: 4.5,  tiempoPromedio: "2m 40s" },
  { nombre: "Teclado Mecánico RGB",         estado: "Activo",   usuarios: 16724, ventas:  3853, vistasUsuario: 3.1,  tiempoPromedio: "2m 55s" },
  { nombre: "Webcam Full HD 1080",          estado: "Activo",   usuarios: 19245, ventas: 10854, vistasUsuario: 7.2,  tiempoPromedio: "2m 20s" },
  { nombre: "Mouse Ergonómico Pro",         estado: "Inactivo", usuarios:  3224, ventas:  7853, vistasUsuario: 6.5,  tiempoPromedio: "2m 50s" },
  { nombre: "Disco SSD 2TB NVMe",           estado: "Activo",   usuarios:  4824, ventas:  8583, vistasUsuario: 4.3,  tiempoPromedio: "3m 10s" },
  { nombre: "Router WiFi 6 Mesh",           estado: "Inactivo", usuarios:  1824, ventas:  4583, vistasUsuario: 2.7,  tiempoPromedio: "3m 25s" },
  { nombre: "Tablet Android 12\"",          estado: "Activo",   usuarios:  2824, ventas:  9853, vistasUsuario: 5.1,  tiempoPromedio: "3m 05s" },
  { nombre: "Impresora Láser Color",        estado: "Activo",   usuarios:  2424, ventas:  6583, vistasUsuario: 4.8,  tiempoPromedio: "3m 15s" },
  { nombre: "Cable USB-C PD 240W",          estado: "Inactivo", usuarios:  3624, ventas: 12353, vistasUsuario: 3.5,  tiempoPromedio: "3m 20s" },
  { nombre: "Soporte Laptop Aluminio",      estado: "Activo",   usuarios:  1324, ventas:  5883, vistasUsuario: 2.3,  tiempoPromedio: "3m 30s" },
  { nombre: "Hub USB-C 10 puertos",         estado: "Inactivo", usuarios:  1824, ventas:  7853, vistasUsuario: 3.2,  tiempoPromedio: "3m 15s" },
  { nombre: "Cámara Mirrorless 32MP",       estado: "Activo",   usuarios:  2424, ventas:  9583, vistasUsuario: 2.5,  tiempoPromedio: "3m 35s" },
];

const DEMO_DONUT: DonutChartProps = {
  title: "Ventas por país",
  total: "98.5K",
  totalLabel: "Total",
  segments: [
    { label: "México",   value: 50, color: "#e53935", flag: "🇲🇽" },
    { label: "USA",      value: 35, color: "#1976d2", flag: "🇺🇸" },
    { label: "Colombia", value: 10, color: "#43a047", flag: "🇨🇴" },
    { label: "Otro",     value: 5,  color: "#757575"               },
  ],
};

const DEMO_NAV: NavTreeProps = {
  title: "Líneas de producto",
  items: [
    {
      label: "Sitio web",
      children: [
        { label: "Inicio",    href: "/" },
        { label: "Pricing",   href: "/pricing" },
        { label: "About us",  href: "/about" },
        {
          label: "Store",
          children: [
            { label: "Laptops",     href: "/store/laptops"     },
            { label: "Smartphones", href: "/store/smartphones" },
            { label: "Accesorios",  href: "/store/accesorios"  },
          ],
        },
        { label: "Contacto", href: "/contact" },
        { label: "Ayuda",    href: "/help"    },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// TIPOS DE PROPS — todos opcionales para que el componente funcione solo
// ─────────────────────────────────────────────────────────────────────────────

export interface SalesDashboardProps {
  /** Nombre visible de la tienda */
  storeName?: string;
  /** Texto del breadcrumb */
  subtitle?: string;
  /** Periodo mostrado, ej: "Abr 2025" */
  period?: string;
  /** Array de KPI cards (máx 4 recomendado) */
  kpis?: KpiCardProps[];
  /** Gráfico de área (visitas/sesiones) */
  sessions?: SparklineCardProps;
  /** Gráfico de barras (ingresos) */
  pageViews?: BarChartCardProps;
  /** Título de la tabla */
  tableTitle?: string;
  /** Columnas de la tabla */
  tableColumns?: TableColumn<Record<string, unknown>>[];
  /** Filas de la tabla */
  tableRows?: Record<string, unknown>[];
  /** Árbol de categorías (panel derecho) */
  navTree?: NavTreeProps;
  /** Gráfico de dona (panel derecho) */
  donut?: DonutChartProps;
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────

/**
 * SalesDashboard
 *
 * Uso mínimo — funciona con datos demo sin pasar ningún prop:
 *   <SalesDashboard />
 *
 * Uso con datos reales:
 *   <SalesDashboard
 *     storeName="RenshaMarket"
 *     kpis={misKpis}
 *     sessions={misVisitas}
 *     tableColumns={columnas}
 *     tableRows={productos}
 *   />
 */
export const SalesDashboard: React.FC<SalesDashboardProps> = ({
  storeName   = "Tu Tienda",
  subtitle    = "Dashboard › Inicio",
  period      = "Abr 2025",
  kpis        = DEMO_KPIS,
  sessions    = DEMO_SESSIONS,
  pageViews   = DEMO_BAR,
  tableTitle  = "Detalle de productos",
  tableColumns = DEMO_COLUMNS as TableColumn<Record<string, unknown>>[],
  tableRows    = DEMO_ROWS   as Record<string, unknown>[],
  navTree     = DEMO_NAV,
  donut       = DEMO_DONUT,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", p: { xs: 2, md: 3 } }}>

      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3} flexWrap="wrap" gap={1}>
        <Box>
          <Typography variant="caption" color="text.secondary">{subtitle}</Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <StorefrontIcon sx={{ color: "primary.main", fontSize: 22 }} />
            <Typography variant="h5" fontWeight={700}>{storeName}</Typography>
          </Box>
        </Box>
        {period && (
          <Chip label={period} size="small" sx={{ fontWeight: 600, bgcolor: "action.hover" }} />
        )}
      </Box>

      {/* KPI Cards */}
      {kpis.length > 0 && (
        <>
          <Typography variant="overline" color="text.secondary" display="block" mb={1}>
            Resumen
          </Typography>
          <Grid container spacing={2} mb={3}>
            {kpis.map((kpi, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <KpiCard {...kpi} />
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* Charts */}
      {(sessions || pageViews) && (
        <Grid container spacing={2} mb={3}>
          {sessions && (
            <Grid item xs={12} md={pageViews ? 5 : 12}>
              <SparklineCard {...sessions} />
            </Grid>
          )}
          {pageViews && (
            <Grid item xs={12} md={sessions ? 7 : 12}>
              <BarChartCard {...pageViews} />
            </Grid>
          )}
        </Grid>
      )}

      {/* Table + Right panels */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={navTree || donut ? 8 : 12}>
          <DataTable
            title={tableTitle}
            columns={tableColumns}
            rows={tableRows}
            defaultRowsPerPage={10}
          />
        </Grid>

        {(navTree || donut) && (
          <Grid item xs={12} md={4}>
            <Box display="flex" flexDirection="column" gap={2}>
              {navTree && <NavTree {...navTree} />}
              {donut   && <DonutChart {...donut} />}
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
