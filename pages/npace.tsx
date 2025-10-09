import React from 'react';
import {
  Box,
  Container,
  Typography
} from '@mui/material';

const About: React.FC = () => {
  return (<Box>
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
          NPACE 2026 Conferences
        </Typography>
      </Container>
    </Box>
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <h2>NPACE 2026 Conferences: Open for Registration!</h2>
        <table>
          <tbody>
            <tr>
              <td>
                <b>Enjoy earning your CE/CME credit with NPACE in 2026!</b>
                &nbsp;Join us at any of our amazing in-person conferences at our unbeatable locations! Each conference is unique, offering a variety topics in&nbsp;
                <b>Primary Care, Pharmacology, Acute Care, &amp; more</b>.
                Each location offers great opportunities to earn CE/CME credit with amazing speakers, networking with the NPACE community, exploring new cities and much more!
                <br></br>
                <br></br>
                <b>
                  <u>Locations Include:</u>
                </b>
                <ul >
                  <li >
                    <span role="presentation" >
                      <u>
                        <a target="_blank" href="https://cvent.me/nE25Vg?utm_campaign=18922669-2026%20NPACE%20Event%20Promo&amp;utm_source=hs_email&amp;utm_medium=email&amp;_hsenc=p2ANqtz--6QEG5B_PsoqQgTGFAYRHb3bY1IJC7mVy55YMEwPaRNySxeC__DL_IjuYwZjv7unTVI2-8">
                          The Rhythm of Practice: NPACE Nashville, TN | February 23-25th, 2026
                        </a>
                      </u>
                    </span>
                  </li>
                  <li >
                    <span role="presentation" >
                      <u>
                        <a target="_blank" href="https://cvent.me/1V7An3?utm_campaign=18922669-2026%20NPACE%20Event%20Promo&amp;utm_source=hs_email&amp;utm_medium=email&amp;_hsenc=p2ANqtz--6QEG5B_PsoqQgTGFAYRHb3bY1IJC7mVy55YMEwPaRNySxeC__DL_IjuYwZjv7unTVI2-8">
                          Treasure Your Practice: Pharmacology Gold in Delray Beach, FL | May 5-7th, 2026
                        </a>
                      </u>
                    </span>
                  </li>
                  <li >
                    <span role="presentation" >
                      <u>
                        <a target="_blank" href="https://cvent.me/0aZneD?utm_campaign=18922669-2026%20NPACE%20Event%20Promo&amp;utm_source=hs_email&amp;utm_medium=email&amp;_hsenc=p2ANqtz--6QEG5B_PsoqQgTGFAYRHb3bY1IJC7mVy55YMEwPaRNySxeC__DL_IjuYwZjv7unTVI2-8">
                          Prescription for APP Excellence: Hot Topics, High Impact, Immediate Action Cape Cod, MA | June 8 - 11th, 2026
                        </a>
                      </u>
                    </span>
                  </li>
                  <li >
                    <span role="presentation" >
                      <u>
                        <a target="_blank" href="https://cvent.me/Zyq0DO?utm_campaign=18922669-2026%20NPACE%20Event%20Promo&amp;utm_source=hs_email&amp;utm_medium=email&amp;_hsenc=p2ANqtz--6QEG5B_PsoqQgTGFAYRHb3bY1IJC7mVy55YMEwPaRNySxeC__DL_IjuYwZjv7unTVI2-8" >
                          Pour into Practice: Mental Health &amp; Women’s Health in Napa, CA | November 2-4th, 2026
                        </a>
                      </u>
                    </span>
                  </li>
                </ul>
                <b>Make Earning CE/CME Unforgettable in 2026 with NPACE!</b>
              </td>
            </tr>
          </tbody>
        </table>
        <img style={{ maxWidth: '100%' }} src="/images/npace-2026-conf.jpeg" alt="NPACE 2026 Conferences" />
      </Box>
    </Container>
  </Box>
  );
};

export default About; 