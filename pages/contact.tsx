import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  useTheme,
} from '@mui/material';
import { Email as EmailIcon } from '@mui/icons-material';

const Contact: React.FC = () => {
  const theme = useTheme();

  return (
    <Box>
      <Box
        sx={{
          backgroundImage: 'url(/images/horizon-bg-jpg.jpg)',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          color: 'white',
          py: { xs: 6, md: 8 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3rem' },
              fontWeight: 300,
              mb: 3,
              textShadow: '0 2px 8px rgba(0,0,0,0.95)',
            }}
          >
            Contact The Author
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
          {/* Email Contact Section */}
          <Paper
            elevation={2}
            sx={{
              p: 4,
              textAlign: 'center',
              maxWidth: 600,
              width: '100%',
            }}
          >
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 500 }}>
              Email
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
              <EmailIcon sx={{ fontSize: 48, color: theme.palette.primary.main, mr: 2 }} />
              <Box>
                <Typography
                  component="a"
                  href="mailto:dccorrell123@outlook.com"
                  sx={{
                    fontSize: '1.2rem',
                    color: theme.palette.primary.main,
                    textDecoration: 'none',
                    fontWeight: 500,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  dccorrell123@outlook.com
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact; 