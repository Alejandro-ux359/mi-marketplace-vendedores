"use client";

import React from "react";
import { Box, Card, CardContent, Chip, Typography, useTheme } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import type { KpiCardProps } from "../types/dashboard";

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  trend,
  trendLabel = "vs. mes anterior",
  icon,
  color = "primary",
  prefix = "",
  suffix = "",
}) => {
  const theme = useTheme();
  const isPositive = trend !== undefined && trend >= 0;

  const colorMap: Record<string, string> = {
    primary: theme.palette.primary.main,
    success: theme.palette.success.main,
    error: theme.palette.error.main,
    warning: theme.palette.warning.main,
    info: theme.palette.info.main,
  };
  const accent = colorMap[color] ?? colorMap.primary;

  return (
    <Card
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          bgcolor: accent,
          opacity: 0.8,
        },
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Typography
            variant="caption"
            color="text.secondary"
            fontWeight={600}
            textTransform="uppercase"
            letterSpacing={0.6}
          >
            {title}
          </Typography>
          {icon && <Box sx={{ color: accent }}>{icon}</Box>}
        </Box>

        <Typography variant="h4" fontWeight={700} mt={1} mb={0.5} lineHeight={1.1}>
          {prefix}{value}{suffix}
        </Typography>

        {trend !== undefined && (
          <Box display="flex" alignItems="center" gap={0.5} mt={0.5} flexWrap="wrap">
            <Chip
              size="small"
              icon={isPositive
                ? <TrendingUpIcon sx={{ fontSize: "14px !important" }} />
                : <TrendingDownIcon sx={{ fontSize: "14px !important" }} />
              }
              label={`${isPositive ? "+" : ""}${trend}%`}
              sx={{
                bgcolor: isPositive ? "success.main" : "error.main",
                color: "#fff",
                fontWeight: 700,
                fontSize: 11,
                height: 20,
                "& .MuiChip-icon": { color: "#fff", ml: "4px" },
              }}
            />
            <Typography variant="caption" color="text.secondary">
              {trendLabel}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
