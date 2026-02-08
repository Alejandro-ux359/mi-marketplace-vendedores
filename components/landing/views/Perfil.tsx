import type { IconButtonProps } from "@mui/material/IconButton";
import { useState, useCallback } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem, { menuItemClasses } from "@mui/material/MenuItem";

// Importa la imagen por defecto desde public
import "@/public/assets/images/avatar/avatar-12.webp";

// ----------------------------------------------------------------------

export type AccountPopoverProps = IconButtonProps & {
  data?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
    info?: React.ReactNode;
  }[];
  user?: {
    displayName?: string;
    email?: string;
    photoURL?: string | null;
  };
};

export function AccountPopover({
  data = [],
  user,
  sx,
  ...other
}: AccountPopoverProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(
    null,
  );

  const handleOpenPopover = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) =>
      setOpenPopover(event.currentTarget),
    [],
  );
  const handleClosePopover = useCallback(() => setOpenPopover(null), []);

  // Gradiente del botón con hover
  const gradientFallback = "conic-gradient(#90caf9, #ffcc80, #90caf9)";

  // Avatar: si no hay foto, usar imagen local por defecto
  const avatarSrc = user?.photoURL || "/assets/images/avatar/avatar-12.webp";

  return (
    <>
      <IconButton
        onClick={handleOpenPopover}
        sx={{
          p: 0,
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: gradientFallback,
          overflow: "hidden",
          transition: "transform 0.2s",
          "&:hover": {
            transform: "scale(1.05)",
          },
          ...sx,
        }}
        {...other}
      >
        <Avatar
          src={avatarSrc}
          alt={user?.displayName || "Usuario"}
          sx={{
            width: 40,
            height: 40,
            border: "2px solid #fff",
            boxShadow: "0 0 4px rgba(0,0,0,0.2)",
          }}
        />
      </IconButton>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: { sx: { width: 220, borderRadius: 2, overflow: "hidden" } },
        }}
      >
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle1" noWrap>
            {user?.displayName || "Usuario"}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user?.email || "example@email.com"}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuList
          disablePadding
          sx={{
            p: 1,
            display: "flex",
            flexDirection: "column",
            [`& .${menuItemClasses.root}`]: {
              px: 2,
              gap: 1,
              borderRadius: 1,
              color: "text.secondary",
              "&:hover": { color: "text.primary", bgcolor: "action.hover" },
              [`&.${menuItemClasses.selected}`]: {
                color: "text.primary",
                bgcolor: "action.selected",
                fontWeight: "bold",
              },
            },
          }}
        >
          {data.map((option) => (
            <MenuItem key={option.label}>
              {option.icon}
              {option.label}
            </MenuItem>
          ))}
        </MenuList>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth color="error" size="medium" variant="text">
            Logout
          </Button>
        </Box>
      </Popover>
    </>
  );
}
