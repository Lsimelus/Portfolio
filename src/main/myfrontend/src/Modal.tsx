import Theme from "./Theme";
import React, {Component, useState} from "react";
import  styled  from  'styled-components';
import profile from './Files/pic1.PNG'
import {ImageComponent } from "./ImageComponent";
import Modal from "react-modal";

const ModalLayout = styled.div <{}>`
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 15vw;
  max-height: 55vh;
  margin: auto;
  font-family: arial;
}

.title {
  color: grey;
  font-size: 18px;
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
  font-size: 18px;
}

a {
  text-decoration: none;
  font-size: 22px;
  color: black;
}

button:hover, a:hover {
  opacity: 0.7;
}
    }`;




export const ModalComponent: React.FunctionComponent<{name_: string, technologies_:string, details_:string, collaboration_: string, url_:string, vidurl_:string}> = ({  children }) => {
    const [isOpen, setIsOpen] = useState(false);

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    return (
        <ModalLayout>
            <div className="card">
                <ImageComponent src_={profile} height_={"30vh"}></ImageComponent>
                <p className="title">Royal Fitness</p>
                <p>Swift, Google Console Firebase</p>
                <div >
                    <a href="#"><i className="fa fa-dribbble"></i></a>
                    <a href="#"><i className="fa fa-twitter"></i></a>
                    <a href="#"><i className="fa fa-linkedin"></i></a>
                    <a href="#"><i className="fa fa-facebook"></i></a>
                </div>
                <button  onClick={toggleModal}>Contact</button>
                <Modal
                    isOpen={isOpen}
                    onRequestClose={toggleModal}
                    contentLabel="My dialog"
                    className="mymodal"
                    overlayClassName="myoverlay"
                    closeTimeoutMS={500}
                >
                    <div>My modal dialog.</div>
                    <button onClick={toggleModal}>Close modal</button>
                </Modal>
            </div>


        </ModalLayout>
    );
}