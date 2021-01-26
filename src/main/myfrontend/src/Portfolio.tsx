import Theme from "./Theme";
import React, { Component } from "react";
import  styled  from  'styled-components';
import profile from './Files/pic1.PNG'
import {ImageComponent } from "./ImageComponent";

const PortfolioLayout = styled.div <{}>`
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  margin: auto;
  text-align: center;
  font-family: arial;
  border-radius: 15px;
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




export const PortfolioComponent: React.FunctionComponent = ({  children }) => {
    const [email, setEmail] = React.useState("");

    return (
        <PortfolioLayout>
            <div className="card">
                <ImageComponent src_={profile} height_={"30vh"}></ImageComponent>
                    <p className="title">Royal Fitness</p>
                    <p>Swift, Googlr Console Firebase</p>
                    <div >
                        <a href="#"><i className="fa fa-dribbble">Swift</i></a>
                        <a href="#"><i className="fa fa-twitter">Google Console Firebase</i></a>
                        <a href="#"><i className="fa fa-linkedin">nk</i></a>
                        <a href="#"><i className="fa fa-facebook"> k nk</i></a>
                    </div>
                    <p>
                        <button>Contact</button>
                    </p>
            </div>


        </PortfolioLayout>
    );
}