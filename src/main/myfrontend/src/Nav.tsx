import  styled  from  'styled-components';
import React from "react";

const NavLayout = styled.nav<{}>`
    height: 10vh;
    display: flex;
    justify-content: flex-end;
    top: 0;
    left: 0;
    width: 100%;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.4);
    
    position: fixed;
    background: #4e54c8;
    }`;





export const NavComponent: React.FunctionComponent = ({  children }) => {
    return (
        <NavLayout className={"area"}>
            {children}
        </NavLayout>

    );
}