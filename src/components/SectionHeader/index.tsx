import React from "react";
import { Box, Stack, Typography } from '@mui/material';

export interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

/** Consistent left-aligned heading used by every page section. */
const SectionHeader = ({ eyebrow, title, subtitle, action }: SectionHeaderProps) => (
  <Stack
    direction={{ xs: 'column', sm: 'row' }}
    justifyContent="space-between"
    alignItems={{ xs: 'flex-start', sm: 'flex-end' }}
    spacing={2}
    sx={{ mb: 6, textAlign: 'left' }}
  >
    <Box>
      <Typography
        variant="overline"
        color="primary"
        sx={{ fontWeight: 700, letterSpacing: '0.12em', display: 'block', mb: 1 }}
      >
        {eyebrow}
      </Typography>
      <Typography variant="h2" sx={{ fontWeight: 700 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: 640 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
    {action}
  </Stack>
);

export default SectionHeader;
