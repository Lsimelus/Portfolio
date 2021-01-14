import React from "react";
import  styled  from  'styled-components';

const PageLayout = styled.div<{height?: string, color: string, background: string }>`
    color: ${props => props.color};
    background-color:  ${props => props.background};
    right: 0px;
    left: 0px;
    border: 1px solid black;
    ${props => props.height};
    }`;



export const PageComponent: React.FunctionComponent<{ height_?: string, color_: string, background_: string }> = ({ height_, color_, background_, children }) => (
    <PageLayout color = {color_}  background = { background_ } height = { height_ == undefined ? "height: 50px;" : height_ }>

    </PageLayout>
);