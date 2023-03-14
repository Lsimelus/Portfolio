import React from "react";
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


/*
type ButtonTypes = 'add'|'remove'|'edit';
type StyledButtonProps = {
  type: ButtonTypes,
  size?: "small" | "medium" | "large",
  onClick?: Function,
  disabled?: boolean
}

export const CommonButtonComponent= ({disabled=false, type, size="medium", onClick}: StyledButtonProps) => {
  return (
    <IconButton disabled={disabled} size={size} onClick={onClick ? () => onClick() : () => false}>
      {(type == 'add' &&
        <AddCircleIcon style={{ color: disabled ? "gray" : "#93c47D" }}/>) // TODO: Figure out how to get theme to work in this file
        || (type == 'remove' &&
        <RemoveCircleIcon style={{ color: disabled ? "gray" : "#FF6D6D" }}/>) // TODO: Figure out how to get theme to work in this file
        || (type == 'edit' &&
        <EditIcon></EditIcon>)
      }
    </IconButton>
 );
};
*/