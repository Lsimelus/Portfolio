import React from "react";
import { Box, Container, Typography, Card, CardContent, Stack, Button, Grid, useTheme } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import DownloadIcon from '@mui/icons-material/Download';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { resumeData } from "../../data/data"
import { WorkExperience } from "../../types";
import { downloadResume } from "../../utils/reusableFunctions";
import SectionHeader from "../SectionHeader";

/** Number of bullets shown per role before "Show more". */
const VISIBLE_BULLETS = 4;

const JobCard = ({ job, isCurrent }: { job: WorkExperience; isCurrent: boolean }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(false);
  const hidden = job.achievements.length - VISIBLE_BULLETS;
  const bullets = expanded ? job.achievements : job.achievements.slice(0, VISIBLE_BULLETS);

  return (
    <Card
      sx={{
        borderLeft: `4px solid ${isCurrent ? theme.palette.primary.main : theme.palette.divider}`,
        '&:hover': { transform: 'none' },
      }}
    >
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          spacing={1}
          sx={{ mb: 2, textAlign: 'left' }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {job.position}
            </Typography>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 500 }}>
              {job.company}
            </Typography>
          </Box>
          <Typography variant="subtitle2" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
            {job.period}
          </Typography>
        </Stack>

        <Box component="ul" sx={{ pl: 3, m: 0, textAlign: 'left', '& li': { mb: 1.25 } }}>
          {bullets.map((achievement, idx) => (
            <Typography component="li" key={idx} variant="body1" color="text.secondary">
              {achievement}
            </Typography>
          ))}
        </Box>

        {hidden > 0 && (
          <Button
            size="small"
            onClick={() => setExpanded((v) => !v)}
            endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            sx={{ mt: 1, px: 1 }}
          >
            {expanded ? 'Show less' : `Show ${hidden} more`}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

const Resume = () => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      id="Resume"
      sx={{ minHeight: 'auto', py: { xs: 10, md: 12 }, bgcolor: theme.palette.background.paper }}
    >
      <Container maxWidth="lg">
        <SectionHeader
          eyebrow="Resume"
          title="Experience"
          subtitle="Five years building payments, authentication, and data systems in production."
          action={
            <Button variant="outlined" startIcon={<DownloadIcon />} onClick={downloadResume}>
              Download PDF
            </Button>
          }
        />

        <Stack spacing={3} sx={{ mb: 8 }}>
          {resumeData.work.map((job, index) => (
            <JobCard key={job.company} job={job} isCurrent={index === 0} />
          ))}
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
          <SchoolIcon color="primary" />
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Education
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {resumeData.education.map((edu) => (
            <Grid item xs={12} md={6} key={edu.institution}>
              <Card sx={{ height: '100%', '&:hover': { transform: 'none' } }}>
                <CardContent sx={{ p: 3, textAlign: 'left' }}>
                  <Stack direction="row" justifyContent="space-between" spacing={2}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {edu.institution}
                    </Typography>
                    {edu.year && (
                      <Typography variant="subtitle2" color="text.secondary">
                        {edu.year}
                      </Typography>
                    )}
                  </Stack>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: edu.details.length ? 1.5 : 0 }}>
                    {edu.degree}
                  </Typography>
                  {edu.details.length > 0 && (
                    <Box component="ul" sx={{ pl: 3, m: 0, '& li': { mb: 0.5 } }}>
                      {edu.details.map((detail, idx) => (
                        <Typography component="li" key={idx} variant="body2">
                          {detail}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Resume;
