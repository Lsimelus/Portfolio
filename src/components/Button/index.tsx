import {TranslateButton} from "../../styles/commonUIComponents/ButtonStyled"


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
  variant?: "contained" | "outlined" | "text",
  disabled?: boolean
}

export const ButtonComponent = (props: ButtonComponentProps) => {
  const { disabled=false, startIcon, onClick, text, children, background, key, variant = "contained" } = props;

  return (
    <TranslateButton
      key={key}
      style={{
        background: background
      }}
      variant={variant}
      startIcon={startIcon}
      onClick={() => onClick()}
      size="large"
      disabled={disabled}
    >
      {children}
      <b>{text}</b>
    </TranslateButton>

  );
};
