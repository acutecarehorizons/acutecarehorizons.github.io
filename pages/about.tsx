import React from 'react';
import {
  Box,
  Container,
  Typography,
} from '@mui/material';

const About: React.FC = () => {

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
            About Us
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {/* First section with image on right */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'flex-start',
              gap: 4,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#000' }}>
                Books for the Field of Medicine, with focus on acute care treatment and disease 
                management as practiced in Family Practice, Urgent Care and Emergency Medicine - 
                with special focus on the professions of Nurse Practitioner and Physician Assistant.
              </Typography>
            </Box>
            <Box
              sx={{
                flexShrink: 0,
                width: { xs: '100%', md: 'auto' },
                textAlign: 'center',
              }}
            >
              <img
                src="/images/6653534.jpg"
                alt="Medical Books"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  border: '1px solid #ddd',
                  padding: '3px',
                  marginTop: '5px',
                  marginBottom: '10px',
                }}
              />
            </Box>
          </Box>

          {/* Second section with image on left */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column-reverse', md: 'row' },
              alignItems: 'flex-start',
              gap: 4,
            }}
          >
            <Box
              sx={{
                flexShrink: 0,
                width: { xs: '100%', md: 'auto' },
                textAlign: 'center',
              }}
            >
              <img
                src="/images/967713.jpg"
                alt="Dr. Donald Correll"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  border: '1px solid #ddd',
                  padding: '3px',
                  marginTop: '5px',
                  marginBottom: '10px',
                }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontSize: '1.1rem', 
                  lineHeight: 1.8,
                  color: '#000'
                }}
              >
                The author Donald Correll, M.D. is a former Emergency Department Medical Director 
                of Jackson-Madison County General Hospital (Tennessee), which treats 100,000 acute 
                care patients annually.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default About; 