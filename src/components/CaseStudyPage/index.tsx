import React from "react";
import { Link as RouterLink, Navigate, useParams } from "react-router-dom";
import { ThemeProvider, CssBaseline, Box, Container, Typography, Stack, Button, Chip, Grid, Card, CardContent } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import { theme } from "../../theme";
import { caseStudies } from "../../caseStudies";
import { MarkdownView } from "./MarkdownView";
import "./markdown.css";

/** Public case-study page for a project: overview, key decisions, and architecture notes. */
const CaseStudyPage = () => {
  const { slug } = useParams();
  const project = caseStudies.find((p) => p.slug === slug);

  React.useEffect(() => {
    if (!project) return;
    const previousTitle = document.title;
    document.title = `${project.name} case study — Lyndbergh Simelus`;
    window.scrollTo(0, 0);
    return () => { document.title = previousTitle; };
  }, [project]);

  if (!project) return <Navigate to="/" replace />;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ bgcolor: 'background.paper', minHeight: '100vh', py: { xs: 4, md: 6 } }}>
        <Container maxWidth="md">
          <Button component={RouterLink} to="/#Projects" startIcon={<ArrowBackIcon />} sx={{ mb: 4, px: 1 }}>
            Back to portfolio
          </Button>

          <Typography variant="overline" color="primary" sx={{ fontWeight: 700, letterSpacing: '0.12em', display: 'block' }}>
            Case study · {project.tag}
          </Typography>
          <Typography variant="h2" component="h1" sx={{ fontWeight: 800, mb: 2 }}>
            {project.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.125rem', mb: 3 }}>
            {project.summary}
          </Typography>

          <Stack direction="row" spacing={1.5} sx={{ mb: 5 }}>
            {project.liveUrl && (
              <Button variant="contained" startIcon={<LaunchIcon />} href={project.liveUrl} target="_blank" rel="noreferrer">
                Live demo
              </Button>
            )}
            {project.repoUrl && (
              <Button variant="outlined" startIcon={<GitHubIcon />} href={project.repoUrl} target="_blank" rel="noreferrer">
                Source code
              </Button>
            )}
          </Stack>

          <Grid container spacing={2} sx={{ mb: 5 }}>
            {project.metrics.map((m) => (
              <Grid item xs={6} md={3} key={m.label}>
                <Card sx={{ height: '100%', '&:hover': { transform: 'none' } }}>
                  <CardContent>
                    <Typography variant="h6" component="p" color="primary" sx={{ fontWeight: 800, lineHeight: 1.3 }}>
                      {m.value}
                    </Typography>
                    <Typography variant="body2">{m.label}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1.5 }}>
            Stack
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 5 }}>
            {project.stack.map((s) => (
              <Chip key={s} label={s} variant="outlined" />
            ))}
          </Stack>

          <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1.5 }}>
            Key decisions
          </Typography>
          <Box component="ul" sx={{ pl: 3, mb: 6, '& li': { mb: 1.5 } }}>
            {project.decisions.map((d) => (
              <Typography component="li" key={d} variant="body1" color="text.secondary">
                {d}
              </Typography>
            ))}
          </Box>

          <MarkdownView content={project.content} />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default CaseStudyPage;
