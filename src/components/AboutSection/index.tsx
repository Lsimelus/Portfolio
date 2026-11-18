import React from "react";
import { Box, Container, Grid, Typography, Button, useTheme } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { about } from "../../data/data"
import SectionHeader from "../SectionHeader";
import RichText from "../RichText";
import { handleClickScroll } from "../../utils/reusableFunctions";

const About = () => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      id="About"
      sx={{ minHeight: 'auto', py: { xs: 7, md: 12 }, bgcolor: theme.palette.background.default }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
          <Grid item xs={12}>
            <SectionHeader eyebrow="About me" title="What I'm looking for" />
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
              component="div"
              sx={{
                mt: 1,
                p: { xs: 3, sm: 4 },
                borderRadius: 3,
                textAlign: 'left',
                bgcolor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderLeft: `4px solid ${theme.palette.primary.main}`,
              }}
            >
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2 }}>
                <RichText text={about.lookingFor.summary} />
              </Typography>
              <Box component="ul" sx={{ pl: 3, m: 0, '& li': { mb: 1 } }}>
                {about.lookingFor.points.map((point) => (
                  <Typography component="li" key={point} variant="body1" color="text.secondary">
                    <RichText text={point} />
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
