import { ReactNode } from "react";
import { Box, Paper } from "@mui/material";

interface CardTableProps {
  action?: ReactNode;
  header?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
}

export default function CardTable({
  action,
  header,
  content,
  footer,
}: CardTableProps) {
  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        width: "100%",
      }}
    >
      {action && (
        <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      px: 2,
      py: 1,
      gap: 2,
      flexWrap: "wrap", // responsive
    }}
  >
          {action}
        </Box>
      )}

      {/* Header */}
      {header && (
        <Box
          sx={{
            p: 2,
            borderBottom: "1px solid #eee",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          {header}
        </Box>
      )}

      {/* Content */}
      <Box sx={{ width: "100%" }}>{content}</Box>

      {/* Footer */}
      {footer && (
        <Box
          sx={{
            p: 2,
            borderTop: "1px solid #eee",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {footer}
        </Box>
      )}
    </Paper>
  );
}
