import Theme from "./Theme";
import React, {} from "react";
import  styled  from  'styled-components';
import {CardComponent} from "./Modal";
import Data from './Data'

const PortfolioLayout = styled.div <{}>`
    width: 90vh;
    border: 2px solid ${Theme.color.aqua};
    margin: auto;
    border-radius: 25px;
    

    ul {
        width: 90vh;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .btn {
        border: none;
        outline: none;
        padding: 10px 16px;
        background-color: #f1f1f1;
        cursor: pointer;
        font-size: 18px;
        
        :hover {
            background-color: #666;
            color: white;
        }
        :active {
            background-color: #666;
            color: white;
       
        }
        
    }
    `;


export const PortfolioComponent: React.FunctionComponent = ({  children }) => {
    function ModalList() {
        const listItems = Data.map((project, index: number) => (
            <CardComponent key={index.toString()} name_={project.name} technologies_={project.technologies} details_={project.details} collaboration_={project.collaboration} url_={project.url} media_={project.media} done_={project.done}/>
        ));
        return (
            <ul>{listItems}</ul>
        );
    }

    return (
        <div>
            <PortfolioLayout>
                <div id="myDIV">
                    <button className="btn">1</button>
                    <button className="btn active">2</button>
                    <button className="btn">3</button>
                    <button className="btn">4</button>
                    <button className="btn">5</button>
                </div>
                <ModalList />
                {children}
            </PortfolioLayout>
        </div>

    );
}
