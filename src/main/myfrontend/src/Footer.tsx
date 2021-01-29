import  styled  from  'styled-components';
import React from "react";
import Theme from "./Theme";

const FooterLayout = styled.nav<{}>`
    height: 20px;
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.4);
    z-index: 10;
    background: ${Theme.color.darkblue};
    
    p {
        color: ${Theme.color.lightblue};
        bottom: 0;
        right: 0;
    }
    }`;





export const FooterComponent: React.FunctionComponent = ({  children }) => {
    return (
        <FooterLayout className={"area"}>
            {children}
            <p>Copyright © 2021 Lyndbergh Simelus All rights reserved
            </p>
        </FooterLayout>

    );
}