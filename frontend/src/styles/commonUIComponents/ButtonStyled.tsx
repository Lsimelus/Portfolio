import styled from "@emotion/styled"
import Button from "@mui/material/Button"


export const TranslateButton = styled(Button)(({ theme, color = 'primary' }) => ({
    transition: "transform 1s",
    ':hover': {
      backgroundColor: 'white',
      color: "orange",
      transform: "translate(0px, -20px)"
    },
  }));
  

