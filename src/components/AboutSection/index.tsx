import React from "react";
import { Box, Container, Grid, Typography, Button, useTheme } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import profilepic from "../../assets/profile.webp"
import { about, profile } from "../../data/data"
import SectionHeader from "../SectionHeader";
import { handleClickScroll } from "../../utils/reusableFunctions";

const About = () => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      id="About"
      sx={{ minHeight: 'auto', py: { xs: 10, md: 12 }, bgcolor: theme.palette.background.default }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              src={profilepic}
              alt={profile.name}
              loading="lazy"
              sx={{
                width: '100%',
                maxWidth: 360,
                display: 'block',
                mx: 'auto',
                borderRadius: 4,
                boxShadow: theme.shadows[4],
              }}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <SectionHeader eyebrow="About me" title="What's next" />
            {about.paragraphs.map((paragraph, idx) => (
              <Typography
                key={idx}
                variant="body1"
                sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: '1.0625rem', textAlign: 'left', mb: 2.5 }}
              >
                {paragraph}
              </Typography>
            ))}

            <Box
              aria-labelledby="looking-for-heading"
              component="aside"
              sx={{
                mt: 4,
                p: { xs: 3, sm: 4 },
                borderRadius: 3,
                textAlign: 'left',
                bgcolor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderLeft: `4px solid ${theme.palette.primary.main}`,
              }}
            >
              <Typography id="looking-for-heading" variant="h6" component="h3" sx={{ fontWeight: 700, mb: 1 }}>
                What I'm looking for
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2 }}>
                {about.lookingFor.summary}
              </Typography>
              <Box component="ul" sx={{ pl: 3, m: 0, '& li': { mb: 1 } }}>
                {about.lookingFor.points.map((point) => (
                  <Typography component="li" key={point} variant="body1" color="text.secondary">
                    {point}
                  </Typography>
                ))}
              </Box>
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                onClick={() => handleClickScroll('Contact')}
                sx={{ mt: 3 }}
              >
                Let's talk
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
