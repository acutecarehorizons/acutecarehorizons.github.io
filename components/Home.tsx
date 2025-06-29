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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import NextLink from 'next/link';
import { Launch as LaunchIcon, MenuBook as BookIcon } from '@mui/icons-material';
import { books, testimonials } from '../src/data/books';


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
              component={NextLink}
              href="/books"
              passHref
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
                  variant="contained"
                  color="secondary"
                  href="https://www.amazon.com/s?k=facep+%22Donald+Correll%22&i=stripbooks&crid=1BZ63E10N2YII&sprefix=facep+donald+correll+%2Cstripbooks%2C424&ref=nb_sb_noss"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="large"
                  sx={{  display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: theme => theme.palette.amazon.main, minWidth: 0 }}
                >
                  <img src="/images/available_at_amazon.png" alt="Available at Amazon" style={{ maxHeight: 32, width: 'auto', display: 'block'}} />
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  href="https://play.google.com/store/search?q=%22donald%20correll%22%20facep&c=books&hl=en_US"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="large"
                  sx={{ minWidth: 0, p: 0, height: 64, display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: 'transparent', border: 'none' }}
                >
                  <img src="/images/google-play-badge.png" alt="Get it on Google Play" style={{ maxHeight: 66, width: 'auto', display: 'block' }} />
                </Button>
          </Box>
        </Container>
      </Box>

      {/* Featured Books */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
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
          Acute Care Horizons Books
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: 4,
          }}
        >
          {books.filter(book => book.edition === '2025').map((book) => (
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
                <List dense sx={{ py: 0 }}>
                  {book.features.map((feature, index) => (
                    <ListItem key={index} sx={{ py: 0, px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <LaunchIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={feature}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  href={`/books?book=${book.id}`}
                  fullWidth
                  sx={{ py: 1.5 }}
                >
                  View Details
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