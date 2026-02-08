import type { IconButtonProps } from '@mui/material/IconButton';
import { useState, useCallback } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';


// ----------------------------------------------------------------------

type NotificationItemProps = {
  id: string;
  type: string;
  title: string;
  isUnRead: boolean;
  description: string;
  avatarUrl: string | null;
  postedAt: string | number | null;
};

export type NotificationsPopoverProps = IconButtonProps & {
  data?: NotificationItemProps[];
};

export function NotificationsPopover({ data = [], sx, ...other }: NotificationsPopoverProps) {
  const [notifications, setNotifications] = useState(data);
  const totalUnRead = notifications.filter((n) => n.isUnRead).length;

  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => setOpenPopover(event.currentTarget), []);
  const handleClosePopover = useCallback(() => setOpenPopover(null), []);

  const handleMarkAllAsRead = useCallback(() => {
    setNotifications(notifications.map((n) => ({ ...n, isUnRead: false })));
  }, [notifications]);

  return (
    <>
      <IconButton color={openPopover ? 'primary' : 'default'} onClick={handleOpenPopover} sx={sx} {...other}>
        <Badge badgeContent={totalUnRead} color="error">
          <NotificationsIcon width={24} />
        </Badge>
      </IconButton>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { sx: { width: 360, overflow: 'hidden', display: 'flex', flexDirection: 'column' } } }}
      >
        <Box sx={{ py: 2, pl: 2.5, pr: 1.5, display: 'flex', alignItems: 'center' }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>
          {totalUnRead > 0 && (
            <Tooltip title="Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <NotificationsIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ minHeight: 240, maxHeight: { xs: 360, sm: 'none' }, overflowY: 'auto' }}>
          <List
            disablePadding
            subheader={<ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>New</ListSubheader>}
          >
            {notifications.slice(0, 2).map((n) => (
              <NotificationItem key={n.id} notification={n} />
            ))}
          </List>

          <List
            disablePadding
            subheader={<ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>Before that</ListSubheader>}
          >
            {notifications.slice(2, 5).map((n) => (
              <NotificationItem key={n.id} notification={n} />
            ))}
          </List>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple color="inherit">
            View all
          </Button>
        </Box>
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

function NotificationItem({ notification }: { notification: NotificationItemProps }) {
  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.isUnRead && { bgcolor: '#e3f2fd' }), 
      }}
    >
      <ListItemAvatar>
        <Avatar>{notification.avatarUrl ? <img src={"false"} alt="avatar" /> : notification.title.charAt(0)}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="subtitle2">
            {notification.title}
            <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
              &nbsp;{notification.description}
            </Typography>
          </Typography>
        }
        secondary={
          <Typography variant="caption" sx={{ mt: 0.5, display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.disabled' }}>
            <NotificationsIcon width={14} />
            {notification.postedAt ?? 'Just now'}
          </Typography>
        }
      />
    </ListItemButton>
  );
}
