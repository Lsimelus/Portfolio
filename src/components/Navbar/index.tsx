import React from "react";
import { AppBar, Toolbar, Box, Button, Container, Typography, IconButton, Drawer, List, ListItemButton, ListItemText, useScrollTrigger, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import { handleClickScroll, downloadResume } from "../../utils/reusableFunctions"
import { profile } from "../../data/data";

/** Section ids, in page order. Labels are what the nav shows. */
export const navSections: { id: string; label: string }[] = [
  { id: "Home", label: "Home" },
  { id: "Resume", label: "Experience" },
  { id: "Projects", label: "Projects" },
  { id: "Skills", label: "Skills" },
  { id: "About", label: "About" },
  { id: "Contact", label: "Contact" },
]

/** Tracks which section currently occupies the band just below the navbar. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = React.useState(ids[0]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

const sectionIds = navSections.map((s) => s.id);

const Navbar = () => {
  const theme = useTheme();
  const active = useActiveSection(sectionIds);
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 100 });
  const [menuOpen, setMenuOpen] = React.useState(false);

  const goTo = (id: string) => {
    setMenuOpen(false);
    handleClickScroll(id);
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: trigger ? 'rgba(255, 255, 255, 0.92)' : 'transparent',
        backdropFilter: trigger ? 'blur(10px)' : 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        borderBottom: `1px solid ${trigger ? theme.palette.divider : 'transparent'}`,
        color: theme.palette.text.primary,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <Typography
            component="button"
            onClick={() => handleClickScroll("Home")}
            sx={{
              display: 'block',
              p: 0,
              border: 0,
              background: 'none',
              cursor: 'pointer',
              fontWeight: 800,
              fontSize: '1.1rem',
              color: 'inherit',
              whiteSpace: 'nowrap',
            }}
          >
            {profile.name}
          </Typography>

          <Box
            component="nav"
            aria-label="Sections"
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 0.5,
              mx: 'auto',
            }}
          >
            {navSections.map(({ id, label }) => (
              <Button
                key={id}
                onClick={() => handleClickScroll(id)}
                aria-current={active === id ? 'true' : undefined}
                sx={{
                  color: active === id ? theme.palette.primary.main : theme.palette.text.primary,
                  fontWeight: active === id ? 600 : 500,
                  fontSize: '0.9375rem',
                  px: 2,
                  py: 1,
                  minWidth: 0,
                  flexShrink: 0,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: active === id ? '60%' : '0%',
                    height: '2px',
                    background: theme.palette.primary.main,
                    transition: 'width 0.3s ease',
                  },
                  '&:hover': {
                    bgcolor: 'transparent',
                    boxShadow: 'none',
                    '&::after': { width: '60%' },
                  },
                }}
              >
                {label}
              </Button>
            ))}
          </Box>

          <Button
            variant="contained"
            size="small"
            startIcon={<DownloadIcon />}
            onClick={downloadResume}
            sx={{ display: { xs: 'none', md: 'inline-flex' }, whiteSpace: 'nowrap', py: 0.75, px: 2 }}
          >
            Resume
          </Button>

          <IconButton
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            sx={{ display: { xs: 'inline-flex', md: 'none' }, ml: 'auto', color: 'inherit' }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        slotProps={{ paper: { sx: { width: 'min(80vw, 300px)', p: 2 } } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List component="nav" aria-label="Sections">
          {navSections.map(({ id, label }) => (
            <ListItemButton
              key={id}
              selected={active === id}
              onClick={() => goTo(id)}
              sx={{ borderRadius: 2, py: 1.5 }}
            >
              <ListItemText
                primary={label}
                slotProps={{ primary: { sx: { fontWeight: active === id ? 700 : 500, fontSize: '1.1rem' } } }}
              />
            </ListItemButton>
          ))}
        </List>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={() => { setMenuOpen(false); downloadResume(); }}
          sx={{ mt: 2 }}
        >
          Download Resume
        </Button>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
