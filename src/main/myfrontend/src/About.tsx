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
    height: 130vh;
    border-radius: 15px;
    
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
    dd {
    text-align: left;
    }
    
    dt {
    text-align: left;
    }
    
    }`;


const Left2 = styled(Left)`
    width: 75vh;
    dt {
    font-weight: bold;
    }
`;

const Right = styled.div <{}>`
    width: 40vh;
    float: right;
    padding-right: 7vh;
    ul li {
    text-align: left;
    }
    }`;

const Right2 = styled(Right)`
    width: 23vh;
    }`;

const Bottom = styled.div <{}>`
    width: 90%;
    padding-top: 30vh;
    }`;

const Bottom2 = styled(Bottom)`
    padding-top: 65vh;
    li {
        list-style-type: none;
    }
    }`;


export const AboutComponent: React.FunctionComponent = ({  children }) => {
    return (
        <Container>
            <Left>
                <h3>What do I do?</h3>
                <p>I like building awesome software. I've built websites, corporate software and even games! If you are interested, you can view some of my favorite projects in my <Link to={"#Contact"} spy={true} smooth={true}>portfolio</Link> down below.
                    Need something built or simply want to have chat? Reach out to me on social media or send me an <a href={"mailto:lsimelus@gmail.com"}>email</a>.</p>
                <a href={"https://github.com/Lsimelus"}>
                    <ImageComponent src_={github} height_={"5vh"} ></ImageComponent>
                </a>

                <a href={"www.linkedin.com/in/lyndbergh-simelus-129522157"}>
                    <ImageComponent src_={linkedin} height_={"5vh"}></ImageComponent>
                </a>

                <a href={"https://www.instagram.com/lyndberghs/"}>
                    <ImageComponent src_={insta} height_={"5vh"}></ImageComponent>
                </a>
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
                    <dl>
                        <dt>Independent Study</dt>
                        <dd>- With a partner, created a iOS mobile fitness application using Xcode</dd>
                        <dt>Tamr, Inc. - Software Engineer Intern</dt>
                        <dd>- Researched, presented, and then implemented telemetry into company’s software using React</dd>
                        <dd>- Created react components that are used throughout the company and its customers</dd>
                        <dt>Memic - Software Engineer Intern</dt>
                        <dd>- Created a rest API in C#/.NET that was implemented into company web applications</dd>
                        <dd>- Developed and debugged action buttons on company websites using various technologies</dd>
                        <dd>- Utilized ticketing system, navigated larger repositories, and refined SQL queries in company apps</dd>
                        <dt>Baldwin Mentor Tutoring - Baldwin Tutor</dt>
                        <dd>- Lead course study group and exam review sessions for Computer Science and Biology classes
                        </dd>
                        <dd>- Provide strategies and occasionally tutor workshop sessions problem solving and studying</dd>
                        <dt>Information Technology - Service Desk </dt>
                        <dd>- Troubleshoot, manage and utilize software and hardware to assist peers and faculty computer</dd>
                    </dl>
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
                <Bottom2>
                    <h3>Harvard Business School Online (2020)</h3>
                    <ul>
                        <li>150+ hours of coursework in Financial Accounting, Business Analytics, and Managerial.</li>
                        <a href={hbo}><li> HBX CORe (Credential of Readiness) Certificate</li></a>
                    </ul>
                </Bottom2>

            </Bottom>
            {children}
        </Container>

    );
}