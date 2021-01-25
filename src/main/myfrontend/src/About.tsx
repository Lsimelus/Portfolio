import React, { Component } from "react";
import  styled  from  'styled-components';
import logo from "./Files/Logo.png";
import github from "./Files/github.png"
import linkedin from "./Files/LinkedIn.png"
import insta from './Files/instagram.png'
import mail from './Files/mail.png'
import phone from './Files/phone.png'
import location from './Files/location3.png'
import {ImageComponent} from "./ImageComponent";
import Theme from "./Theme";
import {Link} from 'react-scroll'
import resume from './Files/resume.pdf'
import hbo from './Files/HarvardBusiness School certificate.pdf'
import { Bar } from './Contact'

const Container = styled.form <{}>`
    width: 90%;
    padding: 20px;
    border: 2px solid ${Theme.color.primary};
    
    h3 {
    padding-bottom: 15px;
    text-align: center;
    }
    }`;

const Left = styled.div <{}>`
    float: left;
    width: 40vh;
    padding-left: 7vh;
    p {
        text-align: left;
    }
    ul li {
    text-align: left;
    }
    
    }`;

const Left2 = styled.div <{}>`
    float: left;
    width: 55vh;
    padding-left: 7vh;
    p {
        text-align: left;
    }
    ul li {
    text-align: left;
    }
    
    }`;

const Right = styled.div <{}>`
    width: 40vh;
    float: right;
    padding-right: 7vh;
    ul li {
    text-align: left;
    }
    }`;

const Right2 = styled.div <{}>`
    width: 28vh;
    float: right;
    padding-right: 7vh;
    ul li {
    text-align: left;
    }
    }`;

const Bottom = styled.div <{}>`
    width: 90%;
    padding-top: 35vh;
    }`;

export const AboutComponent: React.FunctionComponent = ({  children }) => {
    return (
        <Container>
            <Left>
                <h3>What do I do?</h3>
                <p>I like building awesome software. I've built websites, browser plugins, corporate software and even games! If you are interested, you can view some of my favorite projects in my portfolio down below.

                    Need something built or simply want to have chat? Reach out to me on social media or send me an email.</p>
            </Left>
            <Right>
                <h3>Personal interest</h3>
                <p>When I am not coding my next project, I enjoy spending my time doing any of the following:</p>
                <ul>
                    <li>I love speaking Haitian Creole.</li>
                    <li>I watch professional Basketball</li>
                    <li>I read my bible</li>
                    <li>I love running </li>
                </ul>
            </Right>
            <Bottom>
                <h1>Education</h1>
                <Bar></Bar>
                <h3>Bowdoin College (2017-2021)</h3>
                <Left2>
                    <h3>Relevant Experiences</h3>
                    <ul>
                        <li>Independent Study</li>
                        <span>vjvjbjhkbjhbvhg</span>
                        <li>Tamr, Inc.</li> <span>Researched, presented, and then implemented telemetry into company’s software using React
Created react components that are used throughout the company and its customers
</span>
                        <li>Memic</li>
                        <li>Baldwin Mentor Tutoring</li>
                        <li>Information Technology</li>
                    </ul>
                </Left2>
                <Right2>
                    <h3>Extra-curriculars</h3>
                    <ul>
                        <li>Track & Field</li>
                        <li>Volunteer Teacher Assistant </li>
                        <li>BSE Mentor</li>
                        <li>Black Student Union</li>
                        <li>Students of the Caribbean Association</li>
                        <li>Bowdoin Science Scholars</li>
                        <li>I-M Basketball</li>
                        <li>Patsy Dickenson’s Neurobiology Lab</li>
                    </ul>
                </Right2>
                <Bottom>
                    <h3>Harvard Business School Online (2020)</h3>
                    <ul>
                        <li>I love speaking Haitian Creole.</li>
                        <li>I watch professional Basketball</li>
                        <li>I read my bible</li>
                        <li>I love running </li>
                    </ul>
                </Bottom>

            </Bottom>
            {children}
        </Container>

    );
}