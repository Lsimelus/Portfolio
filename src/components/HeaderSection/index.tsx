import React from "react";
import { Box, Container, Typography, Stack, Button, IconButton, Chip, Grid, Tooltip, useTheme } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import DownloadIcon from '@mui/icons-material/Download';
import DescriptionIcon from '@mui/icons-material/Description';
import PlaceIcon from '@mui/icons-material/Place';
import { contactLinks, profile } from "../../data/data";
import { handleClickScroll, downloadResume, viewResume } from "../../utils/reusableFunctions";
import Navbar from "../Navbar";
import profilepic from "../../assets/profile.webp";

const quickLinks = [
  { icon: LinkedInIcon, href: contactLinks.linkedin, label: "LinkedIn" },
  { icon: GitHubIcon, href: contactLinks.github, label: "GitHub" },
  { icon: EmailIcon, href: contactLinks.emailLink, label: "Email" },
];

const Header = () => {
  const theme = useTheme();

  return (
    <Box
      component="header"
      id="Home"
      sx={{
        minHeight: { xs: 'auto', md: '92vh' },
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
      }}
    >
      <Box className="gradient-mesh-bg" />

      <Navbar />

      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          textAlign: 'left',
          pt: { xs: 14, md: 16 },
          pb: { xs: 8, md: 10 },
        }}
      >
        <Box className="fade-in">
          <Grid container spacing={{ xs: 4, md: 6 }} sx={{ alignItems: 'center', mb: 7 }}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap', mb: 3 }}>
                <Chip
                  size="small"
                  label={profile.availability}
                  sx={{
                    height: 'auto',
                    py: 0.5,
                    maxWidth: '100%',
                    '& .MuiChip-label': { whiteSpace: 'normal' },
                    bgcolor: `${theme.palette.success.main}1A`,
                    color: theme.palette.success.main,
                    fontWeight: 600,
                    '&::before': {
                      content: '""',
                      width: 8,
                      height: 8,
                      ml: 1.25,
                      borderRadius: '50%',
                      bgcolor: theme.palette.success.main,
                    },
                  }}
                />
                <Chip size="small" icon={<PlaceIcon />} label={profile.location} variant="outlined" />
              </Stack>

              <Typography variant="h1" sx={{ fontWeight: 800, mb: 1 }}>
                {profile.name}
              </Typography>

              <Typography
                variant="h3"
                component="p"
                sx={{
                  mb: 3,
                  fontWeight: 600,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {profile.title}
              </Typography>

              <Typography
                variant="body1"
                className="fade-in-delay-1"
                sx={{ fontSize: { xs: '1.05rem', md: '1.25rem' }, color: 'text.secondary', maxWidth: 720, mb: 5 }}
              >
                {profile.pitch}
              </Typography>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                className="fade-in-delay-2" sx={{ alignItems: { xs: 'stretch', sm: 'center' } }}>
                <Button variant="contained" size="large" startIcon={<DownloadIcon />} onClick={downloadResume}>
                  Download Resume
                </Button>
                <Button variant="outlined" size="large" startIcon={<DescriptionIcon />} onClick={viewResume}>
                  View Resume
                </Button>
                <Button variant="text" size="large" onClick={() => handleClickScroll("Contact")}>
                  Get in touch →
                </Button>
                <Stack direction="row" spacing={0.5} sx={{ pl: { sm: 1 } }}>
                  {quickLinks.map(({ icon: Icon, href, label }) => (
                    <Tooltip title={label} key={label}>
                      <IconButton
                        component="a"
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={label}
                        sx={{ color: 'text.primary' }}
                      >
                        <Icon />
                      </IconButton>
                    </Tooltip>
                  ))}
                </Stack>
              </Stack>
            </Grid>

            <Grid sx={{ display: { xs: 'none', md: 'block' } }} size={{ md: 4 }}>
              <Box
                component="img"
                src={profilepic}
                alt={profile.name}
                sx={{
                  width: '100%',
                  maxWidth: 340,
                  aspectRatio: '4 / 5',
                  objectFit: 'cover',
                  display: 'block',
                  mx: 'auto',
                  borderRadius: 4,
                  boxShadow: theme.shadows[6],
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} className="fade-in-delay-3">
            {profile.stats.map((stat) => (
              <Grid key={stat.label} size={{ xs: 12, sm: 6, md: 4 }}>
                <Box
                  sx={{
                    p: 2.5,
                    height: '100%',
                    borderRadius: 3,
                    bgcolor: 'rgba(255,255,255,0.7)',
                    border: `1px solid ${theme.palette.divider}`,
                    backdropFilter: 'blur(6px)',
                  }}
                >
                  <Typography variant="h4" component="h2" sx={{ fontWeight: 800, color: 'primary.main' }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
