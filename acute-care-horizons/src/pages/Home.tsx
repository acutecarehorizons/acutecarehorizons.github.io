import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Paper,
  Fade,
  useTheme,
  Alert,
  keyframes,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Launch as LaunchIcon, MenuBook as BookIcon } from '@mui/icons-material';
import { books, testimonials } from '../data/books';

const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Home: React.FC = () => {
  const theme = useTheme();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Rotate testimonials every 4.5 seconds like in the original
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage:
            'linear-gradient(rgba(36,103,141,0.45), rgba(36,103,141,0.45)), url(/images/horizon-bg-jpg.jpg)',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          color: 'white',
          py: { xs: 8, md: 12 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 300,
              mb: 3,
              textTransform: 'uppercase',
              textShadow: '0 2px 8px rgba(0,0,0,0.45)',
            }}
          >
            Welcome to Acute Care Horizons
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{
              fontSize: { xs: '1.1rem', md: '1.4rem' },
              fontWeight: 300,
              mb: 4,
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.6,
              textShadow: '0 2px 8px rgba(0,0,0,0.95)',
            }}
          >
            We strive to supply the best in acute care protocols, disease management and practice guides
            for Nurse Practitioners and Physician Assistants. Concise and fast-reading resources in a 
            bulleted outline format for family practice, urgent care, and emergency medicine.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={RouterLink}
              to="/books"
              variant="contained"
              size="large"
              startIcon={<BookIcon />}
              sx={{
                bgcolor: theme.palette.secondary.main,
                color: 'white',
                py: 2,
                px: 4,
                fontSize: '1.1rem',
                '&:hover': {
                  bgcolor: theme.palette.secondary.dark,
                },
              }}
            >
              View Our Books
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<LaunchIcon />}
              sx={{
                borderColor: 'white',
                color: 'white',
                py: 2,
                px: 4,
                fontSize: '1.1rem',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
              href="https://www.amazon.com/s?k=acute+care+protocols+6th+edition+Donald+Correll&i=stripbooks"
              target="_blank"
              rel="noopener noreferrer"
            >
              Shop on Amazon
            </Button>
          </Box>
        </Container>
      </Box>

      {/* 6th Edition Announcement */}
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Alert
          icon={false}
          severity="success"
          sx={{
            borderRadius: 3,
            boxShadow: '0 2px 16px 0 rgba(51,135,162,0.10)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: { xs: '1rem', md: '1.15rem' },
            py: { xs: 2, md: 2 },
            px: { xs: 2, md: 4 },
            background: 'linear-gradient(270deg,rgb(122, 207, 235),rgb(118, 157, 195), #b3e5fc)',
            backgroundSize: '400% 400%',
            animation: `${gradientMove} 16s ease-in-out infinite`,
            color: '#000',
            fontWeight: 500,
            textAlign: 'center',
          }}
          iconMapping={{}}
        >
          6th Edition Books Available!{' '}
          <Button
            href="https://www.amazon.com/s?k=acute+care+protocols+6th+edition+Donald+Correll&i=stripbooks"
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            color="secondary"
            size="small"
            sx={{ ml: 2, fontWeight: 600, borderRadius: 2 }}
          >
            Shop on Amazon
          </Button>
        </Alert>
      </Container>

      {/* Featured Books */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            textAlign: 'center',
            mb: 6,
            color: theme.palette.text.primary,
            fontWeight: 400,
          }}
        >
          Acute Care Protocols
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(3, 1fr)',
            },
            gap: 4,
          }}
        >
          {books.map((book) => (
            <Card
              key={book.id}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                },
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  height: 300,
                  objectFit: 'contain',
                  bgcolor: '#fff',
                  p: 2,
                }}
                image={book.coverImage}
                alt={book.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 500 }}>
                  {book.title}
                </Typography>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  {book.subtitle}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {book.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<LaunchIcon />}
                  href={book.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  fullWidth
                  sx={{ py: 1.5 }}
                >
                  Buy on Amazon
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Container>

      {/* Testimonials Section */}
      <Box sx={{ bgcolor: '#f8f9fa', py: 8 }}>
        <Container maxWidth="md">
          <Typography
            variant="h3"
            component="h2"
            sx={{
              textAlign: 'center',
              mb: 6,
              color: theme.palette.text.primary,
              fontWeight: 400,
            }}
          >
            What Our Customers Are Saying
          </Typography>

          <Box sx={{ minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Fade in={true} timeout={1000} key={currentTestimonial}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  bgcolor: 'transparent',
                  maxWidth: '700px',
                }}
              >
                <Typography
                  variant="h6"
                  component="blockquote"
                  sx={{
                    fontStyle: 'italic',
                    color: theme.palette.text.primary,
                    lineHeight: 1.6,
                    fontSize: '1.2rem',
                    position: 'relative',
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      fontSize: '3rem',
                      color: theme.palette.primary.main,
                      position: 'absolute',
                      left: -20,
                      top: -10,
                      lineHeight: 1,
                    }}
                  >
                    "
                  </Box>
                  {testimonials[currentTestimonial]}
                  <Box
                    component="span"
                    sx={{
                      fontSize: '3rem',
                      color: theme.palette.primary.main,
                      position: 'absolute',
                      right: -20,
                      bottom: -20,
                      lineHeight: 1,
                    }}
                  >
                    "
                  </Box>
                </Typography>
              </Paper>
            </Fade>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            {testimonials.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: index === currentTestimonial ? theme.palette.primary.main : '#ddd',
                  mx: 0.5,
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                }}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 