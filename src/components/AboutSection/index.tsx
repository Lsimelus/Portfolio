import React from "react";
import { Box, Container, Grid, Typography, useTheme } from '@mui/material';
import profilepic from "../../assets/profile.jpg"
import { about } from "../../data/data"

const About = React.forwardRef<HTMLElement>((props, ref) => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      ref={ref}
      id="About"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        py: 12,
        bgcolor: theme.palette.background.default,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: -20,
                  left: -20,
                  right: 20,
                  bottom: 20,
                  border: `3px solid ${theme.palette.primary.main}`,
                  borderRadius: 4,
                  zIndex: 0,
                },
              }}
            >
              <Box
                component="img"
                src={profilepic}
                alt="Lyndbergh Simelus"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 4,
                  position: 'relative',
                  zIndex: 1,
                  boxShadow: theme.shadows[4],
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={7}>
            <Box>
              <Typography
                variant="h2"
                sx={{
                  mb: 3,
                  fontWeight: 700,
                }}
              >
                Hello! 👋
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.secondary,
                  lineHeight: 1.8,
                  fontSize: '1.125rem',
                }}
              >
                {about.description}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
});

export default About;
