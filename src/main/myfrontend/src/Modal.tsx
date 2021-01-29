import React, {Component, useState} from "react";
import  styled  from  'styled-components';
import {ImageComponent } from "./ImageComponent";
import Modal from "react-modal";
import done from "./Files/done.png"
import load from "./Files/load.png"
import Theme from "./Theme";

const CardLayout = styled.div <{}>`
    width: 30vh;
    max-height: 45vh;
    flex-grow: 1;
    padding-bottom: 7vh;
    overflow: hidden;
    opacity: .5;
    
    
    :hover {
        opacity: 1;
        transform: translateY(8px);
    }
    
    
    .card {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      max-width: 15vw;
      max-height: 55vh;
      margin: auto;
      border-radius: 25px;
      color: ${Theme.color.aqua};
    }


    button {
      border: none;
      outline: 0;
      display: inline-block;
      padding: 8px;
      color: white;
      background-color: #000;
      text-align: center;
      cursor: pointer;
      width: 100%;
      border-radius: 25px; 
      white-space: nowrap;
    }
    
    button:hover, a:hover {
      opacity: 0.7;
    }
    }`;


export const CardComponent: React.FunctionComponent<{done_: boolean, name_: string, technologies_:string, details_:string, collaboration_: string, url_:string, media_:string}> = ({ done_,name_, collaboration_, details_, technologies_, url_, media_, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    function toggleModal() {
        setIsOpen(!isOpen);
        console.log(name_, technologies_, collaboration_);
    }

    return (
        <CardLayout>
            <div className="card">
                {done_?
                    <ImageComponent src_={done} height_={"8vh"}></ImageComponent>:
                    <ImageComponent src_={load} height_={"8vh"}></ImageComponent>
                }
                <button  onClick={toggleModal}>{name_}</button>
                <Modal
                    isOpen={isOpen}
                    onRequestClose={toggleModal}
                    contentLabel="My dialog"
                    className="mymodal"
                    overlayClassName="myoverlay"
                    closeTimeoutMS={500}
                    ariaHideApp={false}
                >
                    <h1>{name_}</h1>
                    <dl>
                        <dt>Code Url</dt>
                        <a href={url_}><dd>- {url_}</dd></a>
                        <dt>Technology</dt>
                        <dd>- {technologies_}</dd>
                        <dt>Details</dt>
                        <dd>- {details_}</dd>
                        <dt>Collaboration Type</dt>
                        <dd>- {collaboration_}</dd>
                        <dt>Media</dt>
                        <a href={media_}>
                            <dd>{media_}</dd>
                        </a>

                    </dl>
                    <button onClick={toggleModal}>Close modal</button>
                </Modal>
            </div>

        </CardLayout>
    );
}