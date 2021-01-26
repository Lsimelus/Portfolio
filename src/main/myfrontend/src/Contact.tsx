import React, { Component } from "react";
import  styled  from  'styled-components';
import logo from "./Files/Logo.png";
import github from "./Files/github.png"
import linkedin from "./Files/LinkedIn.png"
import insta from './Files/instagram.png'
import mail from './Files/mail.png'
import phone from './Files/phone.png'
import location from './Files/location3.png'
import {ImageComponent, ImageLayout} from "./ImageComponent";
import Theme from "./Theme";
import {Link} from 'react-scroll'
import resume from './Files/resume.pdf'
import hbo from './Files/HarvardBusiness School certificate.pdf'
import cv from './Files/Simelus, Lyndbergh Cover Letter.pdf'

const Container = styled.form <{}>`
    width: 42%;
    float: left;
    padding: 20px;
    border: 2px solid ${Theme.color.primary};
    height: 43vh;
    background-color: ${Theme.color.secondary};
    border-radius: 15px;
    li {
        display: inline;
    }
    p {
        color: ${Theme.color.primary}
    }
    }`;

const Left = styled.div <{}>`
    float: left;
    }`;

const Right = styled.div <{}>`
    float: right;
    }`;

export const Bar = styled.hr<{}>`
    width: 95%;
    }`;

export const ContactComponent: React.FunctionComponent = ({  children }) => {
    return (
        <Container>
            <div>
            <Left>
                <Link to={"#Home"} spy={true} smooth={true}>
                    <ImageComponent background_={Theme.color.primary} src_={logo} height_={"14vh"} ></ImageComponent>
                </Link>

            </Left>
            <Right>
                <a href={"https://github.com/Lsimelus"}>
                    <ImageComponent src_={github} height_={"7vh"} ></ImageComponent>
                </a>

                <a href={"www.linkedin.com/in/lyndbergh-simelus-129522157"}>
                    <ImageComponent src_={linkedin} height_={"7vh"}></ImageComponent>
                </a>

                <a href={"https://www.instagram.com/lyndberghs/"}>
                    <ImageComponent src_={insta} height_={"7vh"}></ImageComponent>
                </a>

            </Right>
            </div>

            <Bar></Bar>

            <Left>
                <ImageComponent src_={location} height_={"7vh"}></ImageComponent>
                <p> Greater Boston Area</p>
            </Left>
            <Right>
                <a href={resume}>
                    <p>Resume</p>
                </a>

                <p>Donate</p>
                <a href={cv}>
                    <p>Cover Letter</p>
                </a>

                <a href={hbo}>
                    <p>HBO Certificate</p>
                </a>

            </Right>


            <Bar></Bar>
            <Left><a href={"tel:781-350-8711"}>
                <ImageComponent src_={phone} height_={"5vh"}></ImageComponent>
                <p>781-350-8711</p>
            </a>
            </Left>

            <Right>
                <a href={"mailto:lsimelus@gmail.com"}>
                    <ImageComponent src_={mail} height_={"5vh"}></ImageComponent>
                    <p>lsimelus@gmail.com</p>
                </a>
                <br/>
                <a href={"mailto:lsimelus@bowdoin.edu"}>
                    <p>lsimelus@bowdoin.edu</p>
                </a>


            </Right>
            <div></div>
                    </Container>

    );
}