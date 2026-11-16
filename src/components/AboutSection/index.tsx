import React from "react";
import { Box, Container, Grid, Typography, useTheme } from '@mui/material';
import profilepic from "../../assets/profile.webp"
import { about, profile } from "../../data/data"
import SectionHeader from "../SectionHeader";

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
            <SectionHeader eyebrow="About me" title="Beyond the resume" />
            {about.paragraphs.map((paragraph, idx) => (
              <Typography
                key={idx}
                variant="body1"
                sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: '1.0625rem', textAlign: 'left', mb: 2.5 }}
              >
                {paragraph}
              </Typography>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
