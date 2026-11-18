import React from "react";
import { Box } from '@mui/material';

/**
 * Renders text with **bold** markup. Bold phrases use the primary text color
 * so they stand out from the surrounding secondary text when skimming.
 */
const RichText = ({ text }: { text: string }) => (
  <>
    {text.split(/(\*\*[^*]+\*\*)/).filter(Boolean).map((part, i) =>
      part.startsWith('**') && part.endsWith('**') ? (
        <Box component="strong" key={i} sx={{ fontWeight: 600, color: 'text.primary' }}>
          {part.slice(2, -2)}
        </Box>
      ) : (
        <React.Fragment key={i}>{part}</React.Fragment>
      )
    )}
  </>
);

export default RichText;
