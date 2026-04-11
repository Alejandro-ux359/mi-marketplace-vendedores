"use client";

/**
 * app/views/finanzas/page.tsx
 *
 * Página de Finanzas.
 *
 * Layout:
 *   Fila 1:  [PaymentCard PayPal] [PaymentCard Visa] [PaymentCard Mastercard →] [AddCardButton]
 *   Fila 2:  [FinanceHistory — historial con dropdown de cuentas]
 *
 * Para datos reales:
 *   - Reemplaza CUENTAS_DEMO con tu API /finanzas/cuentas
 *   - Reemplaza rows de FinanceHistory con tu API /finanzas/transacciones
 */

import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import { FinanceHistory, Transaction } from "@/components/Financehistory";
import { AddCardButton } from "@/components/Addcardbutton";
import { PaymentCard, PaymentCardProps } from "@/components/Paymentcard";
// import { PaymentCard, AddCardButton, FinanceHistory } from "@/components/finanzas";
// import type { PaymentCardProps, Transaction } from "@/components/finanzas";

// ── Cuentas demo — reemplaza con tu API ──────────────────────────────────────

const CUENTAS_DEMO: PaymentCardProps[] = [
  {
    bankName: "PayPal",
    brand:    "paypal",
    holder:   "Alejandro García",
    balance:  3420,
    prefix:   "$",
    showArrow: false,
  },
  {
    bankName: "Visa",
    brand:    "visa",
    holder:   "Alejandro García",
    last4:    "4242",
    balance:  8250,
    prefix:   "$",
    showArrow: false,
  },
  {
    bankName: "Mastercard",
    brand:    "mastercard",
    holder:   "Alejandro García",
    last4:    "8881",
    balance:  1100,
    prefix:   "$",
    showArrow: true,  // ← última tarjeta lleva la flecha de navegación
    onNavigate: () => console.log("TODO: ir a detalle Mastercard"),
  },
];

// ── Página ────────────────────────────────────────────────────────────────────

export default function FinanzasPage() {
  const [cuentas, setCuentas] = useState<PaymentCardProps[]>(CUENTAS_DEMO);

  const handleAddCard = () => {
    // TODO: abrir modal de nueva cuenta de pago
    console.log("Abrir modal nueva cuenta");
  };

  const handleRowClick = (row: Transaction) => {
    // TODO: abrir detalle de transacción
    console.log("Transacción:", row);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: "background.default", minHeight: "100vh", boxSizing: "border-box" }}>

      {/* ── Fila 1: Tarjetas de pago + botón agregar ──────────────── */}
      <Grid container spacing={2} sx={{ mb: 2 }} alignItems="stretch">
        {cuentas.map((cuenta, i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: "auto" }} sx={{ flex: { lg: 1 } }}>
            <PaymentCard {...cuenta} />
          </Grid>
        ))}

        <Grid size={{ xs: 12, sm: 6, md: 4, lg: "auto" }}>
          <AddCardButton label="Nueva cuenta" onClick={handleAddCard} minHeight={110} />
        </Grid>
      </Grid>

      {/* ── Fila 2: Historial con filtro por cuenta ───────────────── */}
      <FinanceHistory
        cuentas={cuentas.map((c) => ({
          bankName: c.bankName,
          brand:    c.brand,
          last4:    c.last4,
        }))}
        onRowClick={handleRowClick}
      />
    </Box>
  );
}