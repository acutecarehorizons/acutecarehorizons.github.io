import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Link,
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
function getOrCreateVisitorId() {
  let visitorId = localStorage.getItem('visitorId');
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem('visitorId', visitorId);
  }
  return visitorId;
}

async function trackVisit() {
  const visitorId = getOrCreateVisitorId();
  const withGeo = localStorage.getItem('cookiesAccepted');
  await fetch('/track-visit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      visitorId,
      withGeo,
    }),
  });
}

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Books', path: '/books' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    // Only track visit if not on /link route and only once per tab (window.name)
    if (router.pathname === '/link') return;
    if (!window.name) {
      window.name = 'ach-tab-' + crypto.randomUUID();
      trackVisit();
    }
  }, [router.pathname]);
  
  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.label}
            component={NextLink}
            href={item.path}
            passHref
            onClick={handleDrawerToggle}
            sx={{
              color: router.pathname === item.path ? theme.palette.primary.main : 'inherit',
              textDecoration: router.pathname === item.path ? 'underline' : 'none',
            }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#202020' }}>
        <Toolbar>
          <Box
            component={NextLink}
            href="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
              mr: { md: 4 },
            }}
          >
            <img
              src="/images/1399425217.png"
              alt="Acute Care Horizons"
              style={{ height: 40, marginRight: 16 }}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 300,
                fontSize: { xs: '1rem', md: '1.25rem' },
                display: { xs: 'none', sm: 'block' },
              }}
            >
              Acute Care Horizons
            </Typography>
          </Box>
          <Link
              component={NextLink}
              href="/npace"
              passHref
              sx={{
                color: theme.palette.primary.main,
                textDecoration: 'none',
                fontSize: '.8em',
                float: 'left',
                flexGrow: { xs: 1, md: 0 },
              }}
            >
              NPACE 2026 Conferences: {isMobile ? (<br></br>) : ''} Open for Registration!
            </Link>
          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', ml: 'auto' }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  component={NextLink}
                  href={item.path}
                  color="inherit"
                  sx={{
                    mx: 1,
                    color: router.pathname === item.path ? theme.palette.secondary.main : 'inherit',
                    fontWeight: router.pathname === item.path ? 700 : 400,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>

      {/* Spacer for fixed AppBar */}
      <Toolbar />
    </>
  );
};

export default Navbar; 