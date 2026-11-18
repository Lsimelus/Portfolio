import React from "react";
import { Box, Container, Typography, Card, CardContent, Chip, Stack, Grid, useTheme } from '@mui/material';
import WebIcon from '@mui/icons-material/Web';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import BuildIcon from '@mui/icons-material/Build';
import CodeIcon from '@mui/icons-material/Code';
import LockIcon from '@mui/icons-material/Lock';
import { technologies, TechCategory } from "../../data/data"
import SectionHeader from "../SectionHeader";

const categoryIcons: Record<TechCategory, React.ElementType> = {
  [TechCategory.LANGUAGES]: CodeIcon,
  [TechCategory.FRONTEND]: WebIcon,
  [TechCategory.BACKEND]: StorageIcon,
  [TechCategory.CLOUD]: CloudIcon,
  [TechCategory.SECURITY]: LockIcon,
  [TechCategory.PRACTICES]: BuildIcon,
};

const Skills = () => {
  const theme = useTheme();
  const categories = Object.values(TechCategory)
    .map((category) => ({
      category,
      // Strongest skills first within each group
      items: technologies
        .filter((t) => t.category === category)
        .sort((a, b) => b.proficiencyLevel - a.proficiencyLevel),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <Box
      component="section"
      id="Skills"
      sx={{ minHeight: 'auto', py: { xs: 7, md: 12 }, bgcolor: theme.palette.background.paper }}
    >
      <Container maxWidth="lg">
        <SectionHeader eyebrow="Toolbox" title="Skills" subtitle="Technologies I use in production, strongest first." />

        <Grid container spacing={3}>
          {categories.map(({ category, items }) => {
            const Icon = categoryIcons[category];
            return (
              <Grid item xs={12} sm={6} key={category}>
                <Card sx={{ height: '100%', '&:hover': { transform: 'none' } }}>
                  <CardContent sx={{ p: { xs: 2.5, sm: 3 }, textAlign: 'left' }}>
                    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                      <Icon color="primary" />
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
                        {category}
                      </Typography>
                    </Stack>
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      {items.map((tech) => (
                        <Chip
                          key={tech.name}
                          label={tech.name}
                          sx={{
                            fontWeight: 500,
                            bgcolor: `${tech.primaryColor}14`,
                            border: `1px solid ${tech.primaryColor}55`,
                            color: theme.palette.text.primary,
                          }}
                        />
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default Skills;
