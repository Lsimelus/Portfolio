import styled, { keyframes } from "styled-components"


export const animation = keyframes`
  0% {opacity: 0; filter: blur(10px);}
  100% {opacity: 1; filter: blur(0px);}
`;
export const AnimationWrapper = styled.span`
  opacity: 0;
  filter: blur(10px);
  animation-name: ${animation};
  animation-duration: ${props => props.about ? props.about : "5s"};
  animation-fill-mode: forwards;
`;
