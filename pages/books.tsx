import React, { useState } from 'react';
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
} from '@mui/icons-material';
import { books, Book } from '../src/data/books';

const Books: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const filteredBooks = () => {
    switch (selectedTab) {
      case 1:
        return books.filter(book => book.targetAudience === 'nurse-practitioners');
      case 2:
        return books.filter(book => book.targetAudience === 'physician-assistants');
      default:
        return books;
    }
  };

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

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Filter Tabs or Dropdown */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          {isMobile ? (
            <Select
              value={selectedTab}
              onChange={e => setSelectedTab(Number(e.target.value))}
              fullWidth
              size="small"
              sx={{ maxWidth: 340, mx: 'auto', my: 2, bgcolor: 'white' }}
              displayEmpty
              inputProps={{ 'aria-label': 'Book category filter' }}
            >
              <MenuItem value={0}>All Books</MenuItem>
              <MenuItem value={1}>For Nurse Practitioners</MenuItem>
              <MenuItem value={2}>For Physician Assistants</MenuItem>
            </Select>
          ) : (
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              centered
              aria-label="book category tabs"
              sx={{
                minHeight: 48,
                '.MuiTab-root': {
                  fontSize: { xs: '0.95rem', md: '1.1rem' },
                  minHeight: 48,
                  px: { xs: 1.5, md: 3 },
                  py: { xs: 1, md: 1.5 },
                },
              }}
            >
              <Tab label="All Books" />
              <Tab label="For Nurse Practitioners" />
              <Tab label="For Physician Assistants" />
            </Tabs>
          )}
        </Box>

        {/* Books Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              lg: 'repeat(2, 1fr)',
            },
            gap: 4,
          }}
        >
          {filteredBooks().map((book: Book) => (
            <Card
              key={book.id}
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  height: '100%',
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
                    width: { xs: '100%', md: 200 },
                    height: { xs: 300, md: '100%' },
                    objectFit: 'contain',
                    bgcolor: '#fff',
                    p: 2,
                  }}
                  image={book.coverImage}
                  alt={book.title}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
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
                    
                    <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 500 }}>
                      {book.title}
                    </Typography>
                    <Typography variant="h6" color="primary" gutterBottom>
                      {book.subtitle}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      {book.description}
                    </Typography>

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
                  
                  <CardActions sx={{ p: 3, pt: 0 }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<LaunchIcon />}
                      href={book.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="large"
                      fullWidth
                      sx={{ py: 1.5 }}
                    >
                      Buy on Amazon
                    </Button>
                  </CardActions>
                </Box>
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
      </Container>
    </Box>
  );
};

export default Books; 