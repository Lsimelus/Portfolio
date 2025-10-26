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
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
  IconButton,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import { portfolioData, ProjectType } from "../../data/data"

const Portfolio = React.forwardRef<HTMLElement>((props, ref) => {
  const theme = useTheme();
  const [filter, setFilter] = React.useState<string>('all');

  const filteredProjects = filter === 'all'
    ? portfolioData.projects
    : portfolioData.projects.filter(p =>
      p.type.some(t => t === filter)
    );

  return (
    <Box
      component="section"
      ref={ref}
      id="Portfolio"
      sx={{
        minHeight: '100vh',
        py: 12,
        bgcolor: theme.palette.background.default,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h2" sx={{ fontWeight: 700, mb: 2, textAlign: 'center' }}>
          Featured Projects
        </Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: 'center', color: theme.palette.text.secondary, mb: 6 }}
        >
          Explore some of my recent work
        </Typography>

        {/* Filter Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={(e, value) => value && setFilter(value)}
            sx={{ flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="Frontend">Frontend</ToggleButton>
            <ToggleButton value="Backend">Backend</ToggleButton>
            <ToggleButton value="Full Stack">Full Stack</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Projects Grid */}
        <Grid container spacing={4}>
          {filteredProjects.map((project, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                className="hover-lift"
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
              >
                {project.featured && (
                  <Chip
                    label="Featured"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      zIndex: 1,
                      bgcolor: theme.palette.primary.main,
                      color: '#fff',
                      fontWeight: 600,
                    }}
                  />
                )}

                <CardMedia
                  component="img"
                  height="240"
                  image={project.media.image}
                  alt={project.title}
                  sx={{
                    objectFit: 'cover',
                    bgcolor: theme.palette.grey[100],
                  }}
                />

                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                    {project.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, lineHeight: 1.7 }}
                  >
                    {project.description}
                  </Typography>

                  <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 2 }}>
                    {project.technologies.slice(0, 4).map((tech, idx) => (
                      <Chip
                        key={idx}
                        label={tech}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.75rem' }}
                      />
                    ))}
                    {project.technologies.length > 4 && (
                      <Chip
                        label={`+${project.technologies.length - 4}`}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.75rem' }}
                      />
                    )}
                  </Stack>

                  <Typography variant="caption" color="text.secondary">
                    {project.date}
                  </Typography>
                </CardContent>

                <CardActions sx={{ p: 3, pt: 0 }}>
                  <Button
                    size="small"
                    startIcon={<GitHubIcon />}
                    onClick={() => window.open(project.githubUrl, '_blank')}
                  >
                    Code
                  </Button>
                  {project.liveUrl && (
                    <Button
                      size="small"
                      startIcon={<LaunchIcon />}
                      onClick={() => window.open(project.liveUrl, '_blank')}
                      variant="contained"
                    >
                      Live Demo
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
});

export default Portfolio;
