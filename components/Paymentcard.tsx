"use client";

import React from "react";
import { Box, Typography, IconButton, useTheme } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// ── Logos inline SVG para las marcas más comunes ─────────────────────────────
// Si tienes imágenes propias pásalas como `logoUrl`

const BRAND_STYLES: Record<string, { bg: string; text: string; accent: string }> = {
  visa:       { bg: "#1a1f71", text: "#fff",     accent: "#f7b731" },
  mastercard: { bg: "#252525", text: "#fff",     accent: "#eb001b" },
  paypal:     { bg: "#003087", text: "#fff",     accent: "#009cde" },
  amex:       { bg: "#007bc1", text: "#fff",     accent: "#fff"    },
  stripe:     { bg: "#635bff", text: "#fff",     accent: "#fff"    },
  efectivo:   { bg: "#16a34a", text: "#fff",     accent: "#bbf7d0" },
  otro:       { bg: "#374151", text: "#fff",     accent: "#9ca3af" },
};

export type CardBrand = keyof typeof BRAND_STYLES;

export interface PaymentCardProps {
  /** Nombre del banco o billetera: "Visa", "PayPal", etc. */
  bankName: string;
  /** Marca para aplicar estilos: "visa" | "mastercard" | "paypal" | "amex" | "stripe" | "efectivo" | "otro" */
  brand?: CardBrand;
  /** Titular de la cuenta */
  holder?: string;
  /** Últimos 4 dígitos (opcional, para tarjetas físicas) */
  last4?: string;
  /** Balance disponible en esta cuenta */
  balance?: number;
  /** Prefijo de moneda */
  prefix?: string;
  /** URL de logo personalizado (reemplaza el texto de marca) */
  logoUrl?: string;
  /** Si es la última tarjeta del listado, muestra flecha de navegación */
  showArrow?: boolean;
  /** Acción al hacer clic en la flecha */
  onNavigate?: () => void;
}

/**
 * PaymentCard — tarjeta visual de cuenta de pago (Visa, PayPal, Mastercard…).
 *
 * @example
 * <PaymentCard
 *   bankName="PayPal"
 *   brand="paypal"
 *   holder="Alejandro García"
 *   balance={3420}
 *   prefix="$"
 * />
 *
 * <PaymentCard
 *   bankName="Visa"
 *   brand="visa"
 *   holder="Alejandro García"
 *   last4="4242"
 *   balance={8250}
 *   prefix="$"
 *   showArrow
 *   onNavigate={() => router.push('/finanzas/visa')}
 * />
 */
export const PaymentCard: React.FC<PaymentCardProps> = ({
  bankName,
  brand = "otro",
  holder,
  last4,
  balance,
  prefix = "$",
  logoUrl,
  showArrow = false,
  onNavigate,
}) => {
  const key = brand.toLowerCase() as CardBrand;
  const style = BRAND_STYLES[key] ?? BRAND_STYLES.otro;

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: 3,
        bgcolor: style.bg,
        color: style.text,
        p: 2.5,
        minWidth: 200,
        flex: 1,
        minHeight: 110,
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,.18)",
        transition: "transform .15s, box-shadow .2s",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 8px 28px rgba(0,0,0,.25)",
        },
        // Círculo decorativo de fondo
        "&::before": {
          content: '""',
          position: "absolute",
          right: -30,
          top: -30,
          width: 120,
          height: 120,
          borderRadius: "50%",
          bgcolor: style.accent,
          opacity: 0.12,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          right: 20,
          bottom: -40,
          width: 90,
          height: 90,
          borderRadius: "50%",
          bgcolor: style.accent,
          opacity: 0.08,
        },
      }}
    >
      {/* Nombre de la marca / logo */}
      <Box mb={1.5}>
        {logoUrl ? (
          <Box component="img" src={logoUrl} alt={bankName} sx={{ height: 22, objectFit: "contain" }} />
        ) : (
          <Typography
            variant="caption"
            fontWeight={800}
            letterSpacing={2}
            textTransform="uppercase"
            sx={{ color: style.accent, fontSize: 11 }}
          >
            {bankName}
          </Typography>
        )}
      </Box>

      {/* Balance */}
      {balance !== undefined && (
        <Typography variant="h5" fontWeight={700} lineHeight={1} mb={0.5}>
          {prefix}{balance.toLocaleString()}
        </Typography>
      )}

      {/* Titular + últimos 4 dígitos */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
        {holder && (
          <Typography variant="caption" sx={{ opacity: 0.75, fontSize: 11 }}>
            {holder}
          </Typography>
        )}
        {last4 && (
          <Typography variant="caption" sx={{ opacity: 0.6, letterSpacing: 2, fontSize: 11 }}>
            •••• {last4}
          </Typography>
        )}
      </Box>

      {/* Flecha de navegación (última tarjeta) */}
      {showArrow && (
        <IconButton
          onClick={onNavigate}
          size="small"
          sx={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
            bgcolor: "#fff",
            color: style.bg,
            width: 34,
            height: 34,
            "&:hover": { bgcolor: "#f0f0f0" },
          }}
        >
          <ArrowForwardIcon sx={{ fontSize: 18 }} />
        </IconButton>
      )}
    </Box>
  );
};