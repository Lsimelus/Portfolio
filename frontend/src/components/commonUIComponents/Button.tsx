import { styled } from '@mui/material/styles';
import Button from "@mui/material/Button"

export const StyledButton = styled(Button)(({ theme, color = 'primary' }) => ({
  transition: "transform 1s",
  ':hover': {
    backgroundColor: 'white',
    color: "orange",
    transform: "translate(0px, -20px)"
  },
}));


type ButtonComponentProps = {
  onClick: Function,
  color?: string,
  hoverColor?: string
  size?: number,
  children?: JSX.Element,
  startIcon?: JSX.Element,
  text?: string,
  background?: string,
  key?: number,
  variant?: "contained" | "outlined"
}

export const ButtonComponent = (props: ButtonComponentProps) => {
  const { startIcon, onClick, text, children, background, key, variant = "contained" } = props;

  return (
    <StyledButton
    key={key}
      style={{
        background: background
      }}
      variant={variant}
      startIcon={startIcon}
      onClick={() => onClick()}
      size="large"
    >
      {children}
      <b>{text}</b>
    </StyledButton>
  );
};
