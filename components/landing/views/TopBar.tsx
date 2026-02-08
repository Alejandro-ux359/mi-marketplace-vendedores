"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Searchbar } from "./Buscador";
import { NotificationsPopover } from "./Notificacion";
import { AccountPopover } from "./Perfil";

export default function TopBar() {
  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        height: 64,
        px: 3,
        mb: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end", 
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <Searchbar />
        <NotificationsPopover />
        <AccountPopover />
      </Stack>
    </Box>
  );
}
