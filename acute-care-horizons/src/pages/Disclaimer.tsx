import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Disclaimer: React.FC = () => (
  <Container maxWidth="md" sx={{ py: 8 }}>
    <Box>
      <Typography variant="h2" component="h1" sx={{ mb: 4, fontWeight: 500, color: '#000', textAlign: 'left' }}>
        Disclaimer
      </Typography>
      <Typography variant="body1" sx={{ color: '#000', textAlign: 'left' }}>
        The author of this book has checked with sources believed to be reliable. However, medicine is an ever-changing science and art. As new research and clinical experience expand the knowledge base, changes in treatment and protocols are required. Further, there is a possibility of human error or of changes in medical science. Neither the author nor any party involved in the preparation or publication of this work warrants that the information contained herein is in every respect accurate or complete, and they disclaim all responsibility for any errors or omissions, or for results obtained from use of the information contained in these protocols or this publication.
      </Typography>
    </Box>
  </Container>
);

export default Disclaimer; 