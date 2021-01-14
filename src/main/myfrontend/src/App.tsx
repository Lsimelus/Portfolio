import React from 'react';
import './App.css';
import {PageComponent} from './Page'
import { ButtonComponent} from "./Button";

//<p>~~~~~~~</p>

function App() {
  return (
    <div className="App">
      <PageComponent color_={"blue"} background_={"red"} >
          <p>
              bukbjkbk
          </p>
      </PageComponent>
        <PageComponent color_={"orange"} background_={"yellow"} height_={"50%"}>
            <p>
                bukbjkbk
            </p>
        </PageComponent>
        <ButtonComponent color_={"red"} link_={""} >
            knk,n,
        </ButtonComponent>
        <ButtonComponent color_={"blue"} link_={""} >
            jb,bj,
        </ButtonComponent>
        <ButtonComponent color_={"green"} link_={""} >
            m, ,
        </ButtonComponent>
    </div>
  );
}

export default App;
