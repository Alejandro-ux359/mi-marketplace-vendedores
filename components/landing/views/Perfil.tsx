import type { IconButtonProps } from '@mui/material/IconButton';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { FaUserCircle } from 'react-icons/fa';

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

export function AccountPopover({ data = [], user, sx, ...other }: AccountPopoverProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => setOpenPopover(event.currentTarget),
    []
  );
  const handleClosePopover = useCallback(() => setOpenPopover(null), []);

  const gradientFallback = 'conic-gradient(#90caf9, #ffcc80, #90caf9)';

  // Avatar: si no hay foto, mostrar inicial o ícono por defecto
  const avatarContent = user?.photoURL ? (
    <Avatar src={user.photoURL} alt={user.displayName || 'User'} sx={{ width: 1, height: 1 }} />
  ) : user?.displayName ? (
    <Avatar sx={{ width: 1, height: 1 }}>{user.displayName.charAt(0).toUpperCase()}</Avatar>
  ) : (
    <Avatar sx={{ width: 1, height: 1 }}>
      <FaUserCircle size={24} />
    </Avatar>
  );

  return (
    <>
      <IconButton
        onClick={handleOpenPopover}
        sx={{
          p: '2px',
          width: 40,
          height: 40,
          background: gradientFallback,
          ...sx,
        }}
        {...other}
      >
        {avatarContent}
      </IconButton>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: { sx: { width: 200 } },
        }}
      >
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.displayName || 'Usuario'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email || 'example@email.com'}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuList
          disablePadding
          sx={{
            p: 1,
            gap: 0.5,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 1,
              color: 'text.secondary',
              '&:hover': { color: 'text.primary' },
              [`&.${menuItemClasses.selected}`]: {
                color: 'text.primary',
                bgcolor: 'action.selected',
                fontWeight: 'bold',
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

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth color="error" size="medium" variant="text">
            Logout
          </Button>
        </Box>
      </Popover>
    </>
  );
}
