import React from 'react';
import { Container, Typography, Box, Link } from '@mui/material';

const TermsOfUse: React.FC = () => (
  <Container maxWidth="md" sx={{ py: 8 }}>
    <Box>
      <Typography variant="h2" component="h1" sx={{ mb: 4, fontWeight: 500, color: '#000', textAlign: 'left' }}>
        Terms of use
      </Typography>

      <Typography variant="h2" component="h2" sx={{ mt: 4, mb: 2, fontSize: '1.5rem', fontWeight: 500, color: '#000', textAlign: 'left' }}>
        Refund Policy
      </Typography>
      <Typography variant="body1" sx={{ color: '#000', mb: 3, textAlign: 'left' }}>
        Acute Care Horizons, LLC will replace a defective book or a book damaged in shipping, provided it is returned within 30 days of receiving.
      </Typography>

      <Typography variant="h2" component="h2" sx={{ mt: 4, mb: 2, fontSize: '1.5rem', fontWeight: 500, color: '#000', textAlign: 'left' }}>
        Privacy Policy
      </Typography>
      <Typography variant="body1" sx={{ color: '#000', mb: 2, textAlign: 'left' }}>
        Acute Care Horizons, LLC is highly sensitive to the privacy interests of consumers and believes that the protection of those interests is one of its most significant responsibilities. In acknowledgment of its obligations, Acute Care Horizons, LLC has adopted the following Privacy Policy applicable to information about consumers that it acquires in the course of its business:
      </Typography>
      <Typography variant="body1" sx={{ color: '#000', mb: 2, textAlign: 'left' }}>
        1. Acquisition of Information. We do not acquire any more information about consumers than is required by law or is otherwise necessary to provide a high level of service efficiently and securely.
      </Typography>
      <Typography variant="body1" sx={{ color: '#000', mb: 2, textAlign: 'left' }}>
        2. Our Employees and Privacy. We train all of our employees about the importance of privacy. We give access to information about consumers only to those employees who require it to perform their jobs.
      </Typography>
      <Typography variant="body1" sx={{ color: '#000', mb: 2, textAlign: 'left' }}>
        3. Security Measures. We make access to privacy-sensitive information subject to rigorous procedural and technological controls, consistent with legal requirements and the demands of customer service.
      </Typography>
      <Typography variant="body1" sx={{ color: '#000', mb: 2, textAlign: 'left' }}>
        4. Disclosure to Third Parties. We will provide individually-identifiable information about consumers to third parties only if we are compelled to do so by order of a duly-empowered governmental authority, we have the express permission of the consumer, or it is necessary to process transactions and provide our services.
      </Typography>
      <Typography variant="body1" sx={{ color: '#000', mb: 2, textAlign: 'left' }}>
        5. Privacy and Our Business Partners. When we make our technology or services available to business partners, we will not share with them any more consumer information than is necessary, and we will make every reasonable effort to assure, by contract or otherwise, that they use our technology and services in a manner that is consistent with this Privacy Policy.
      </Typography>
      <Typography variant="body1" sx={{ color: '#000', mb: 2, textAlign: 'left' }}>
        Questions. If you have questions about this privacy policy, please send an e-mail to{' '}
        <Link href="mailto:sales@acutecarehorizons.com">sales@acutecarehorizons.com</Link>.
      </Typography>
      <Typography variant="body1" sx={{ color: '#000', mb: 2, textAlign: 'left' }}>
        If you have any questions, please feel free to <Link href="/contact">contact us</Link>. Thank you.
      </Typography>
    </Box>
  </Container>
);

export default TermsOfUse; 