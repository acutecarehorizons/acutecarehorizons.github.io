import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { 
  Launch as LaunchIcon, 
  CheckCircle as CheckIcon,
  School as SchoolIcon,
  LocalHospital as HospitalIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { books, Book } from '../src/data/books';
import { useRouter } from 'next/router';

const Books: React.FC = () => {
  const router = useRouter();
  const { book: bookQuery, paper: paperQuery } = router.query;
  const [selectedFilter, setSelectedFilter] = useState(bookQuery ? 'book' : 'eBook');
  const [selectedBookId, setSelectedBookId] = useState(bookQuery || '');
  const [expandedDesc, setExpandedDesc] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleFilterChange = (event: any) => {
    const value = event.target.value as string;
    setSelectedFilter(value);
    setSelectedBookId('');
    if (value === 'eBook' || value === 'Paper') {
      router.replace({ pathname: '/books', query: {} }, undefined, { shallow: true });
    }
  };

  const filteredBooks = () => {
    if (selectedFilter === 'book' && selectedBookId) {
      return books.filter(book => book.id === selectedBookId);
    }
    if (selectedFilter === 'eBook') {
      return books.filter(book => book.edition === 'eBook');
    }
    if (selectedFilter === 'Paper') {
      return books.filter(book => book.edition === 'Paper');
    }
    return books;
  };

  useEffect(() => {
    if (bookQuery && !paperQuery) {
      setSelectedFilter('book');
      setSelectedBookId(bookQuery as string);
      setExpandedDesc(bookQuery as string);
    }
    if(paperQuery == "true"){
      setSelectedFilter('Paper');
    }
  }, [bookQuery, paperQuery]);

  const getAudienceIcon = (audience: string) => {
    switch (audience) {
      case 'nurse-practitioners':
        return <SchoolIcon />;
      case 'physician-assistants':
        return <HospitalIcon />;
      default:
        return <SchoolIcon />;
    }
  };

  const getAudienceLabel = (audience: string) => {
    switch (audience) {
      case 'nurse-practitioners':
        return 'Nurse Practitioners';
      case 'physician-assistants':
        return 'Physician Assistants';
      default:
        return 'All Practitioners';
    }
  };

  return (
    <Box>
      {/* Page Header */}
      <Box
        sx={{
          backgroundImage: 'linear-gradient(rgba(36,103,141,0.45), rgba(36,103,141,0.45)), url(/images/horizon-bg-jpg.jpg)',
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
            Acute Care Protocols
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              fontWeight: 300,
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.6,
              textShadow: '0 2px 8px rgba(0,0,0,0.95)',
            }}
          >
            A compendium of acute care protocols, practice and disease management guidelines
            created for Nurse Practitioners and Physician Assistants. Concise, fast-reading
            topics for family practice, urgent care, and emergency medicine.
          </Typography>
        </Container>
      </Box>

      <Box sx={{ py: 6, px: { xs: 2, sm: 4, md: 8 } }}>
        {/* Filter Tabs or Dropdown */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          {selectedFilter === 'book' ? (
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 0 }}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<ArrowBackIcon />}
                onClick={() => {
                  setSelectedFilter('eBook');
                  setSelectedBookId('');
                  router.replace({ pathname: '/books', query: {} }, undefined, { shallow: true });
                }}
                sx={{ maxWidth: 340, my: 2, bgcolor: 'white' }}
              >
                Back to all books
              </Button>
            </Box>
          ) : (
            <Select
              value={selectedFilter}
              onChange={handleFilterChange}
              fullWidth
              size="small"
              sx={{ maxWidth: 340, mx: 'auto', my: 2, bgcolor: 'white' }}
              displayEmpty
              inputProps={{ 'aria-label': 'Book filter' }}
            >
              <MenuItem value={'eBook'}>eBooks</MenuItem>
              <MenuItem value={'Paper'}>Paper Textbooks</MenuItem>
            </Select>
          )}
        </Box>

        {/* Books Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
            gap: 4,
          }}
        >
          {filteredBooks().map((book: Book) => (
            <Card
              key={book.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                minWidth: '450px',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                },
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: '100%',
                  height: 300,
                  objectFit: 'contain',
                  bgcolor: '#fff',
                  p: 2,
                }}
                image={book.coverImage}
                alt={book.title}
              />
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Chip
                    icon={getAudienceIcon(book.targetAudience)}
                    label={getAudienceLabel(book.targetAudience)}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                  <Chip
                    label={book.edition}
                    color="secondary"
                    size="small"
                    sx={{ ml: 1 }}
                  />
                </Box>
                
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  sx={{
                    fontWeight: 500,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    minHeight: '3.6em',
                  }}
                >
                  {book.title}
                </Typography>
                <Typography
                  variant="h6"
                  color="primary"
                  gutterBottom
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    minHeight: '2.4em',
                  }}
                >
                  {book.subtitle}
                </Typography>
                <Box sx={{ position: 'relative', mb: 1 }}>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    paragraph
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: (selectedFilter === 'book' || expandedDesc === book.id) ? 'none' : 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: (selectedFilter === 'book' || expandedDesc === book.id) ? 'visible' : 'hidden',
                      textOverflow: 'ellipsis',
                      minHeight: selectedFilter === 'book' ? 'auto' : '4.5em', // Ensures consistent height for 3 lines
                    }}
                  >
                    {book.description}
                  </Typography>
                  {book.description.length > 120 && selectedFilter !== 'book' && (
                    <Button
                      size="small"
                      color="primary"
                      sx={{ mt: 0, px: 0, minWidth: 0, textTransform: 'none' }}
                      onClick={() => setExpandedDesc(expandedDesc === book.id ? null : book.id)}
                    >
                      {expandedDesc === book.id ? 'Show less' : 'Show more'}
                    </Button>
                  )}
                </Box>

                <Typography variant="h6" component="h4" gutterBottom sx={{ mt: 2, fontWeight: 500 }}>
                  Key Features:
                </Typography>
                <List dense sx={{ py: 0 }}>
                  {book.features.map((feature, index) => (
                    <ListItem key={index} sx={{ py: 0, px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={feature}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              
              <CardActions sx={{ p: 3, pt: 0, mt: 'auto', gap: 2, display: 'flex', flexDirection:'column', justifyContent: 'space-between' }}>
                <div style={{display: 'flex', gap: 20, marginTop: 'auto', justifyContent: 'space-between', padding:3, paddingTop:0}}>
                  {book.googlePlayUrl && (
                    <Button
                      color="inherit"
                      href={`/link?bookId=${book.id}&linkType=google`}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="large"
                      sx={{ minWidth: 0, p: 0, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: 'transparent', border: 'none' }}
                    >
                    <img src="/images/google-play-badge.png" alt="Get it on Google Play" style={{ maxHeight: 40, width: 'auto', display: 'block' }} />
                    </Button>
                  )}
                  {book.appleUrl && (
                    <Button
                      color="inherit"
                      href={`/link?bookId=${book.id}&linkType=apple`}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="large"
                      sx={{ minWidth: 0, p: 0, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: 'transparent', border: 'none' }}
                    >
                    <img src="/images/apple-badge.svg" alt="Get it on Apple Books" style={{ maxHeight: 50, width: 'auto', display: 'block' }} />
                    </Button>
                  )}
                </div>
                <div style={{display: 'flex', gap: 2, marginTop: 'auto', justifyContent: 'space-between', padding:0, marginRight:20}}>
                  <Button
                    color="secondary"
                    href={`/link?bookId=${book.id}&linkType=amazon`}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="large"
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: 'transparent', minWidth: 0 }}
                  >
                    <img src="/images/available_at_amazon.png" alt="Available at Amazon" style={{ maxHeight: 38, width: 'auto', display: 'block'}} />
                  </Button>
                  {book.payHipUrl && (
                    <Button
                      color="inherit"
                      href={`/link?bookId=${book.id}&linkType=payhip`}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="large"
                      sx={{ minWidth: 0, p: 0, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: 'transparent', border: 'none' }}
                    >
                    <img src="/images/payhip-pdf.png" alt="Get the PDF" style={{ maxHeight: 50, width: 'auto', display: 'block' }} />
                    </Button>
                  )}
                </div>
              </CardActions>
            </Card>
          ))}
        </Box>

        {/* Additional Information */}
        <Box sx={{ mt: 6, p: 4, bgcolor: '#f8f9fa', borderRadius: 2 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 500 }}>
            Important Note
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <em>
              The practice guides in the Practice Guide books are similar in content to the protocols 
              in the Acute Care Protocols books. However, the Acute Care Protocols and Disease Management 
              books contain additional pages on disease management topics.
            </em>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Books; 