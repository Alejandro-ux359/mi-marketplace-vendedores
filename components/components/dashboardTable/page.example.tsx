/**
 * app/dashboard/page.tsx  (o pages/dashboard.tsx si usas Pages Router)
 *
 * Ejemplo de uso del dashboard con datos de demo.
 * Reemplaza las importaciones de demo.tsx con tu propia fuente de datos
 * (fetch, API route, Prisma, etc.).
 */
import React from "react";
import { SalesDashboard } from "@/dashboard/components";
import {
  kpisDemo,
  sessionsDemo,
  pageViewsDemo,
  tableColumnsDemo,
  tableRowsDemo,
  donutDemo,
  navTreeDemo,
} from "@/dashboard/data/demo";

export default function DashboardPage() {
  return (
    <SalesDashboard
      storeName="TechShop MX"
      subtitle="Dashboard › Inicio"
      period="Abr 2025"
      kpis={kpisDemo}
      sessions={sessionsDemo}
      pageViews={pageViewsDemo}
      tableTitle="Detalle de productos"
      tableColumns={tableColumnsDemo as any}
      tableRows={tableRowsDemo as any}
      navTree={navTreeDemo}
      donut={donutDemo}
    />
  );
}
