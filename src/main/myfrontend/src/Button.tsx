import React from "react";
import  styled  from  'styled-components';



const ButtonLayout = styled.div<{color_?: string, background_?: string}>`
  background-color: ${props => props.background_};
  border: none;
  color: black;
  padding: 16px 32px;
  text-align: center;
  font-size: 16px;
  margin: 4px 2px;
  opacity: 0.6;
  transition: 0.3s;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  border-radius: 8px;
  
  :hover {
    opacity: 1
  }
  
  }`;

//put a click color

//<a href="mailto:EMAILADDRESS">
//as={} href="/"

export const ButtonComponent: React.FunctionComponent<{ background_?: string, color_?: string, link_?: string, }> = ({ color_, link_,  children }) => (
        <ButtonLayout color={color_} >
        </ButtonLayout>


);