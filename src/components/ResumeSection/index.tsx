import React from "react";
import { Box, Container, Typography, Card, CardContent, Chip, Stack, useTheme } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import { resumeData, technologies } from "../../data/data"

const Resume = React.forwardRef<HTMLElement>((props, ref) => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      ref={ref}
      id="Resume"
      sx={{
        minHeight: '100vh',
        py: 12,
        bgcolor: theme.palette.background.paper,
      }}
    >
      <Container maxWidth="lg">
        {/* Work Experience Section */}
        <Box sx={{ mb: 10 }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 5 }}>
            <WorkIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
            <Typography variant="h2" sx={{ fontWeight: 700, textAlign: 'left' }}>
              Work Experience
            </Typography>
          </Stack>

          <Stack spacing={4}>
            {resumeData.work.map((job, index) => (
              <Card
                key={index}
                className="hover-lift"
                sx={{
                  borderLeft: `4px solid ${theme.palette.primary.main}`,
                  transition: 'all 0.3s ease',
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" sx={{ mb: 2 }}>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 600, mb: 0.5, textAlign: 'left' }}>
                        {job.position}
                      </Typography>
                      <Typography variant="h6" color="primary" sx={{ fontWeight: 500, textAlign: 'left' }}>
                        {job.company}
                      </Typography>
                    </Box>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: theme.palette.text.secondary,
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                        textAlign: 'left',
                      }}
                    >
                      {job.period}
                    </Typography>
                  </Stack>

                  <Box component="ul" sx={{ mt: 2, pl: 3, '& li': { mb: 1.5, textAlign: 'left' } }}>
                    {job.achievements.map((achievement, idx) => (
                      <Typography
                        component="li"
                        key={idx}
                        variant="body1"
                        sx={{ color: theme.palette.text.secondary, textAlign: 'left' }}
                      >
                        {achievement}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>

        {/* Education Section */}
        <Box sx={{ mb: 10 }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 5 }}>
            <SchoolIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
            <Typography variant="h2" sx={{ fontWeight: 700, textAlign: 'left' }}>
              Education
            </Typography>
          </Stack>

          <Stack spacing={4}>
            {resumeData.education.map((edu, index) => (
              <Card
                key={index}
                className="hover-lift"
                sx={{
                  borderLeft: `4px solid ${theme.palette.secondary.main}`,
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" sx={{ mb: 2 }}>
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5, textAlign: 'left' }}>
                        {edu.institution}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'left' }}>
                        {edu.degree}
                      </Typography>
                    </Box>
                    {edu.year && (
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontWeight: 500,
                          textAlign: 'left',
                        }}
                      >
                        {edu.year}
                      </Typography>
                    )}
                  </Stack>

                  {edu.details.length > 0 && (
                    <Box component="ul" sx={{ mt: 2, pl: 3, '& li': { mb: 1, textAlign: 'left' } }}>
                      {edu.details.map((detail, idx) => (
                        <Typography
                          component="li"
                          key={idx}
                          variant="body2"
                          sx={{ color: theme.palette.text.secondary, textAlign: 'left' }}
                        >
                          {detail}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>

        {/* Skills Section */}
        <Box>
          <Typography variant="h2" sx={{ fontWeight: 700, mb: 5, textAlign: 'left' }}>
            Technical Skills
          </Typography>

          <Stack direction="row" flexWrap="wrap" gap={1.5}>
            {technologies.map((tech) => (
              <Chip
                key={tech.name}
                label={tech.name}
                sx={{
                  bgcolor: `${tech.primaryColor}15`,
                  color: tech.primaryColor,
                  borderColor: tech.primaryColor,
                  border: `1.5px solid`,
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  py: 2.5,
                  px: 1,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: tech.primaryColor,
                    color: '#fff',
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[3],
                  }
                }}
              />
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
});

export default Resume;
