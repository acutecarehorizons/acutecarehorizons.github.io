import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  Divider,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

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
            <Typography variant="body2" color="text.secondary">
              6th Edition Books Available at{' '}
              <Link
                href="https://www.amazon.com/s?k=acute+care+protocols+6th+edition+Donald+Correll&i=stripbooks&s=date-desc-rank&ds=v1%3Acq3BPCh%2Fu4mjKy0%2Bf5y6gJf3kTtz8aZaxZjVxi5Rkfs&crid=ECA65RZFP1SI&qid=1675627436&sprefix=acute+care+protocols+6th+edition+donald+correl%2Cstripbooks%2C175&ref=sr_st_date-desc-rank"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                sx={{ fontWeight: 500 }}
              >
                Amazon
              </Link>{' '}
              and other retailers.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" component="div" sx={{ mb: 1, fontWeight: 400 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                component={RouterLink}
                to="/"
                color="text.secondary"
                sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
              >
                Home
              </Link>
              <Link
                component={RouterLink}
                to="/books"
                color="text.secondary"
                sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
              >
                Books
              </Link>
              <Link
                component={RouterLink}
                to="/about"
                color="text.secondary"
                sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
              >
                About
              </Link>
              <Link
                component={RouterLink}
                to="/contact"
                color="text.secondary"
                sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
              >
                Contact
              </Link>
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
            <Link
              component={RouterLink}
              to="/terms-of-use"
              color="text.secondary"
              variant="body2"
              sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
            >
              Terms of Use
            </Link>
            <Link
              component={RouterLink}
              to="/disclaimer"
              color="text.secondary"
              variant="body2"
              sx={{ textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
            >
              Disclaimer
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 