import React from 'react';
import NextLink from 'next/link';
import Link from '@mui/material/Link';
import {
  Box,
  Container,
  Typography,
  Divider,
} from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#f8f9fa',
        borderTop: '2px solid #dcdcdc',
        py: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', md: 'flex-start' },
            textAlign: { xs: 'center', md: 'left' },
            gap: 3,
          }}
        >
          <Box>
            <Typography variant="h6" component="div" sx={{ mb: 1, fontWeight: 400 }}>
              Acute Care Horizons
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Providing the best in acute care protocols and practice guides
              <br />
              for Nurse Practitioners and Physician Assistants.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" component="div" sx={{ mb: 1, fontWeight: 400 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link component={NextLink} href="/" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>Home</Link>
              <Link component={NextLink} href="/books" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>Books</Link>
              <Link component={NextLink} href="/about" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>About</Link>
              <Link component={NextLink} href="/contact" color="text.secondary" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>Contact</Link>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: { xs: 'center', md: 'left' },
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Acute Care Horizons. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link component={NextLink} href="/terms-of-use" color="text.secondary" variant="body2" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>Terms of Use</Link>
            <Link component={NextLink} href="/disclaimer" color="text.secondary" variant="body2" sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>Disclaimer</Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 