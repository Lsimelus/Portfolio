import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  Stack,
  Grid,
  useTheme,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import ArticleIcon from '@mui/icons-material/Article';
import { Link as RouterLink } from "react-router-dom";
import { portfolioData } from "../../data/data"
import { PortfolioProject } from "../../types";
import SectionHeader from "../SectionHeader";

const TechChips = ({ technologies }: { technologies: string[] }) => (
  <Stack direction="row" flexWrap="wrap" gap={1}>
    {technologies.map((tech) => (
      <Chip key={tech} label={tech} size="small" variant="outlined" sx={{ fontSize: '0.75rem' }} />
    ))}
  </Stack>
);

const ProjectLinks = ({ project }: { project: PortfolioProject }) => (
  <>
    {project.liveUrl && (
      <Button
        size="small"
        variant="contained"
        startIcon={<LaunchIcon />}
        href={project.liveUrl}
        target="_blank"
        rel="noreferrer"
      >
        Live demo
      </Button>
    )}
    {project.caseStudySlug && (
      <Button size="small" variant="outlined" startIcon={<ArticleIcon />} component={RouterLink} to={`/projects/${project.caseStudySlug}`}>
        Case study
      </Button>
    )}
    {project.githubUrl && (
      <Button size="small" startIcon={<GitHubIcon />} href={project.githubUrl} target="_blank" rel="noreferrer">
        Code
      </Button>
    )}
  </>
);

const Portfolio = () => {
  const theme = useTheme();
  const featured = portfolioData.projects.filter((p) => p.featured);

  return (
    <Box
      component="section"
      id="Projects"
      sx={{ minHeight: 'auto', py: { xs: 10, md: 12 }, bgcolor: theme.palette.background.default }}
    >
      <Container maxWidth="lg">
        <SectionHeader
          eyebrow="Recent work"
          title="Projects"
          subtitle="Full-stack applications I've designed, built, and shipped."
        />

        <Grid container spacing={4}>
          {featured.map((project) => (
            <Grid item xs={12} md={6} key={project.title}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="240"
                  image={project.media.image}
                  alt={`${project.title} screenshot`}
                  loading="lazy"
                  sx={{ objectFit: 'cover', objectPosition: 'top', bgcolor: theme.palette.grey[100] }}
                />
                <CardContent sx={{ flexGrow: 1, p: 3, textAlign: 'left' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={2} sx={{ mb: 1 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      {project.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
                      {project.type.join(' · ')} · {project.date}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ mb: 2.5, lineHeight: 1.7 }}>
                    {project.description}
                  </Typography>
                  <TechChips technologies={project.technologies} />
                </CardContent>
                <CardActions sx={{ px: 3, pb: 3, pt: 0, gap: 1 }}>
                  <ProjectLinks project={project} />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Portfolio;
