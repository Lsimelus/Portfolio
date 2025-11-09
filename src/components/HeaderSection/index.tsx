import React, { RefObject } from "react";
import { Box, Container, Typography, Stack, Button, IconButton, useTheme } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GitHubIcon from '@mui/icons-material/GitHub';
import CodeIcon from '@mui/icons-material/Code';
import DescriptionIcon from '@mui/icons-material/Description';
import WorkIcon from '@mui/icons-material/Work';
import { contactLinks } from "../../data/data";
import { handleClickScroll } from "../../utils/reusableFunctions";
import Navbar from "../Navbar";
import ResumeModal from "../ResumeModal";

export interface HeaderProps {
  aboutRef: RefObject<HTMLElement>,
  resumeRef: RefObject<HTMLElement>,
  serviceRef: RefObject<HTMLElement>,
  portfolioRef: RefObject<HTMLElement>,
  contactRef: RefObject<HTMLElement>
}

const newestProjectLink = "https://real-calc-client-blush.vercel.app/"

const Header = (props: HeaderProps) => {
  const { aboutRef, resumeRef, serviceRef, portfolioRef, contactRef } = props;
  const theme = useTheme();
  const headerRef = React.useRef<HTMLElement>(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <Box
      component="header"
      ref={headerRef}
      id="Home"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
      }}
    >
      {/* Modern gradient mesh background */}
      <Box className="gradient-mesh-bg" />

      <Navbar
        aboutRef={aboutRef}
        resumeRef={resumeRef}
        serviceRef={serviceRef}
        portfolioRef={portfolioRef}
        contactRef={contactRef}
        headerRef={headerRef}
      />

      <ResumeModal getModal={modalOpen} setModal={setModalOpen} />

      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          py: { xs: 8, md: 12 },
        }}
      >
        <Box className="fade-in">
          <Typography
            variant="h1"
            sx={{
              mb: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 800,
            }}
          >
            Hi, I'm Lyndbergh
          </Typography>

          <Typography
            variant="h3"
            className="fade-in-delay-1"
            sx={{
              mb: 6,
              color: theme.palette.text.secondary,
              fontWeight: 500,
            }}
          >
            Full-Stack Software Engineer
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            className="fade-in-delay-2"
            sx={{
              mb: 4,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<GitHubIcon />}
              onClick={() => window.open(contactLinks.github, "_blank")}
            >
              GitHub
            </Button>

            <Button
              variant="contained"
              size="large"
              startIcon={<CodeIcon />}
              onClick={() => window.open(newestProjectLink, "_blank")}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5568d3 0%, #64408a 100%)',
                },
              }}
            >
              Latest Project
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<DescriptionIcon />}
              onClick={() => setModalOpen(true)}
            >
              View Resume
            </Button>

            <Button
              variant="contained"
              size="large"
              startIcon={<WorkIcon />}
              onClick={() => handleClickScroll("Service")}
              sx={{
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #3d8fd3 0%, #00c9d4 100%)',
                },
              }}
            >
              Hire Me
            </Button>
          </Stack>

          <IconButton
            className="fade-in-delay-3"
            onClick={() => handleClickScroll("About")}
            sx={{
              mt: 4,
              animation: 'bounce 2s infinite',
              '@keyframes bounce': {
                '0%, 100%': {
                  transform: 'translateY(0)',
                },
                '50%': {
                  transform: 'translateY(-10px)',
                },
              },
            }}
          >
            <KeyboardArrowDownIcon fontSize="large" />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
