"use client";

import React from "react";
import {
  Box, Card, CardContent, CardHeader, LinearProgress, Typography, useTheme,
} from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import type { DonutChartProps } from "../types/dashboard";

const COLORS = ["#e53935", "#1976d2", "#43a047", "#fb8c00", "#757575"];

export const DonutChart: React.FC<DonutChartProps> = ({
  title,
  total,
  totalLabel = "Total",
  segments,
}) => {
  const theme = useTheme();
  const totalVal = segments.reduce((s, seg) => s + seg.value, 0);
  const data = segments.map((seg, i) => ({
    ...seg,
    color: seg.color ?? COLORS[i % COLORS.length],
    pct: totalVal > 0 ? Math.round((seg.value / totalVal) * 100) : 0,
  }));

  return (
    <Card sx={{ borderRadius: 2, border: "1px solid", borderColor: "divider" }}>
      <CardHeader
        title={<Typography variant="subtitle1" fontWeight={600}>{title}</Typography>}
        sx={{ pb: 0 }}
      />
      <CardContent sx={{ pt: 1 }}>
        <Box sx={{ height: 180, position: "relative" }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={52} outerRadius={78} paddingAngle={2} dataKey="value">
                {data.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 8,
                  fontSize: 12,
                }}
                formatter={(v: number) => [`${v.toLocaleString()}`, ""]}
              />
            </PieChart>
          </ResponsiveContainer>
          {total !== undefined && (
            <Box sx={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)", textAlign: "center", pointerEvents: "none",
            }}>
              <Typography variant="h6" fontWeight={700} lineHeight={1}>{total}</Typography>
              <Typography variant="caption" color="text.secondary">{totalLabel}</Typography>
            </Box>
          )}
        </Box>

        <Box display="flex" flexDirection="column" gap={1} mt={1}>
          {data.map((seg, i) => (
            <Box key={i}>
              <Box display="flex" justifyContent="space-between" mb={0.3}>
                <Box display="flex" alignItems="center" gap={0.8}>
                  <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: seg.color, flexShrink: 0 }} />
                  <Typography variant="caption">{seg.flag} {seg.label}</Typography>
                </Box>
                <Typography variant="caption" fontWeight={700}>{seg.pct}%</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={seg.pct}
                sx={{
                  height: 4, borderRadius: 2, bgcolor: "action.hover",
                  "& .MuiLinearProgress-bar": { bgcolor: seg.color, borderRadius: 2 },
                }}
              />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
