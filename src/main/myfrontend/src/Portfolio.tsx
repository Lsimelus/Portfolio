import Theme from "./Theme";
import React, {Component, useState} from "react";
import  styled  from  'styled-components';
import profile from './Files/pic1.PNG'
import {ImageComponent } from "./ImageComponent";
import Modal from "react-modal";
import {ModalComponent} from "./Modal";
import Data from './Data'


const PortfolioLayout = styled.div <{}>`

    }`;

/*
let Data = [
    {
        "name": "1",
        "url": "1",
        "collaboration": "1",
        "details": "1",
        "technologies":"1",
        "vidurl": "1"
    },
    {
        "name": "2",
        "url": "2",
        "collaboration": "2",
        "details": "2",
        "technologies":"2",
        "vidurl": "2"
    },
    {
        "name": "sadsa",
        "url": "adsa",
        "collaboration": "asdsa",
        "details": "asda",
        "technologies":"sadsad",
        "vidurl": "asdsa"
    },
    {
        "name": "",
        "url": "",
        "collaboration": "",
        "details": "",
        "technologies":"",
        "vidurl": ""
    }
];*/

export const PortfolioComponent: React.FunctionComponent = ({  children }) => {
    const numbers = [1, 2, 3, 4, 5];


    function ModalList() {

        const data = Object.entries(Data)
        const listItems = data.map((project: any, index: number) =>
            <li key={index.toString()}>
                <ModalComponent key={index} name_={project.name} technologies_={project.technologies} details_={project.details} collaboration_={project.collaboration} url_={project.url} vidurl_={project.vidurl}/>
            </li>
        );
        return (
            <ul>{listItems}</ul>
        );
    }

    return (
        <PortfolioLayout>
            <ModalList />
            {children}
        </PortfolioLayout>
    );
}