"use client";

import React from "react";
import { Box, Card, CardContent, Chip, Typography, useTheme } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from "recharts";
import type { BarChartCardProps } from "../types/dashboard";

export const BarChartCard: React.FC<BarChartCardProps> = ({
  title,
  value,
  trend,
  trendLabel = "vs. mes anterior",
  data,
  color = "#1565c0",
  secondaryColor = "#42a5f5",
  prefix = "",
  suffix = "",
  seriesLabel = "Principal",
  secondarySeriesLabel = "Secundario",
}) => {
  const theme = useTheme();
  const isPositive = trend !== undefined && trend >= 0;
  const hasSecondary = data.some((d) => d.secondaryValue !== undefined);

  return (
    <Card sx={{ borderRadius: 2, border: "1px solid", borderColor: "divider", height: "100%", overflow: "hidden" }}>
      <CardContent sx={{ p: 2.5, pb: "8px !important" }}>
        <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase" letterSpacing={0.6}>
          {title}
        </Typography>
        <Box display="flex" alignItems="center" gap={1.5} mt={0.5} flexWrap="wrap">
          <Typography variant="h3" fontWeight={700} lineHeight={1}>
            {prefix}{value}{suffix}
          </Typography>
          {trend !== undefined && (
            <Box display="flex" alignItems="center" gap={0.5}>
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
              {trendLabel && (
                <Typography variant="caption" color="text.secondary">{trendLabel}</Typography>
              )}
            </Box>
          )}
        </Box>
      </CardContent>

      <Box sx={{ height: 160, px: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={2} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} vertical={false} />
            <XAxis dataKey="label" tick={{ fill: theme.palette.text.secondary, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: theme.palette.text.secondary, fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 8,
                fontSize: 12,
              }}
              formatter={(v: number) => `${prefix}${v.toLocaleString()}${suffix}`}
            />
            {hasSecondary && <Legend wrapperStyle={{ fontSize: 11 }} />}
            <Bar dataKey="value" name={seriesLabel} fill={color} radius={[3, 3, 0, 0]} />
            {hasSecondary && (
              <Bar dataKey="secondaryValue" name={secondarySeriesLabel} fill={secondaryColor} radius={[3, 3, 0, 0]} />
            )}
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
};
