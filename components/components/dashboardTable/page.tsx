/**
 * Pega este archivo en:
 *   app/dashboard/page.tsx        ← si usas App Router  (Next.js 13+)
 *   pages/dashboard.tsx           ← si usas Pages Router
 *
 * REQUISITO: instala recharts si no lo tienes
 *   npm install recharts
 *
 * USO MÍNIMO — funciona sin pasar ningún prop:
 *   <SalesDashboard />
 *
 * Cuando tengas tu backend, pasa los props reales:
 *   <SalesDashboard storeName="RenshaMarket" kpis={data.kpis} ... />
 */
import { SalesDashboard } from "@/components/dashboard";
// ↑ Ajusta la ruta según donde colocaste la carpeta components/

export default function DashboardPage() {
  return <SalesDashboard storeName="RenshaMarket" />;
  //      ↑ Solo este prop ya es suficiente — el resto usa datos demo.
}
