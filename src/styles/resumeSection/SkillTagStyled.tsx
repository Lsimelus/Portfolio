import styled from "@emotion/styled";

export const SkillTag = styled.p`
background-color:  ${props => props.title ? props.title : "gray" };
float: left;
outline: none;
padding: 14px 16px;
transition: 0.3s;
color:  ${props => props.color ? props.color : "black" };
border-radius: 25px;
margin: 10px;
border: 1px solid ${props => props.color ? props.color : "rgba(0, 0, 0, 0.5)"};
font-weight: bold;
`;