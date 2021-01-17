import React from "react";
import  styled  from  'styled-components';
import {Link} from 'react-scroll'


const ButtonLayout = styled.div<{color: string, background: string}>`
  background-color: ${props => props.background};
  border: none;
  color: ${props => props.color};
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
    opacity: 1;
    transform: translateY(8px);
  }
  
  :active {
    opacity: .1
  }
  
  }`;


export const ButtonComponent: React.FunctionComponent<{ isDownload_?: boolean, text_: string, background_: string, color_: string, link_: string, }> = ({ isDownload_,background_ , text_, color_, link_,  children }) => (
        <ButtonLayout  background={background_} color={color_} >
            {isDownload_ ?
                <a href={link_} download>
                        {text_}
                </a>
                :
                <Link to={link_} spy={true} smooth={true}>
                {text_}
            </Link>

            }



        </ButtonLayout>


);