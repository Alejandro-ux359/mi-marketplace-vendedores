"use client";

import React from "react";
import { Box, Card, CardContent, Chip, Typography, useTheme } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import type { SparklineCardProps } from "../types/dashboard";

export const SparklineCard: React.FC<SparklineCardProps> = ({
  title,
  value,
  trend,
  trendLabel = "vs. mes anterior",
  data,
  color = "#2196f3",
  prefix = "",
  suffix = "",
}) => {
  const theme = useTheme();
  const isPositive = trend !== undefined && trend >= 0;

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

      <Box sx={{ height: 145, px: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`sparkGrad_${title.replace(/\s/g, "")}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} vertical={false} />
            <XAxis dataKey="label" tick={{ fill: theme.palette.text.secondary, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                background: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 8,
                fontSize: 12,
              }}
              formatter={(v: number) => [`${prefix}${v.toLocaleString()}${suffix}`, title]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              fill={`url(#sparkGrad_${title.replace(/\s/g, "")})`}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
};
