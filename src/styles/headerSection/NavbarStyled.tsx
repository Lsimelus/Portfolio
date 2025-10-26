import styled from "@emotion/styled";

export const NavStyled = styled.nav`
  position: fixed;
    top: 0;
    width: 100%;
    background-color: ${props => props.color};
    z-index:10;
    transition: background-color 1.0s ease-out;
`;

export const NavListStyled = styled.ul`
margin: 5;
  overflow: hidden;
  display: flex;
  justify-content: center;
`;

export const NavListItemStyled = styled.li`
list-style: none;
  justify-content: center;
  padding: clamp(10px, 1.5vw, 40px);
`;

export const NavPages = styled.a`
padding: 2vw;
  position: relative;
  text-decoration: none;
  color: orange;
  font-size: clamp(10px, 1.5vw, 20px);
  transition:font .4s ease-in, color .75s ease-out;
  padding-top: 15vw;
  font-weight: bold;
  text-shadow: "2px 2px 0px black";
  text-shadow: 1px 1px #000000;

  &.nav-active, :hover{
    background-color: orange;
    color: white;
    outline: none;
    padding: 14px 16px;
    transition: 0.3s;
    border-radius: 25px;
  
   }

`;




