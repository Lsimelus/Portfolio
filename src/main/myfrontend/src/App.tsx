import React from 'react';
import './App.css';
import {PageComponent} from './Page'
import { ButtonComponent} from "./Button";

function App() {
  return (
    <div className="App" >
      <PageComponent href_={"#1"} color_={"orange"} background_={"black"} position_={"sticky"} />


      <PageComponent href_={"#2"} color_={"blue"} background_={"transparent"} height_={"700px"}>
        <ButtonComponent isDownload_={false} background_={"purple"} color_={"clear"} link_={"mailto:lsimelus@gmail.com"} text_={"hjvhj"}>
        </ButtonComponent>

        <ButtonComponent isDownload_={false} background_={"blue"} color_={"pink"} link_={"#8"} text_={"~~~~~~~~"}>

        </ButtonComponent>

        <ButtonComponent isDownload_={true} background_={"green"} color_={"purple"} link_={"/Files/resume.pdf"} text_={"jbk,"} >
        </ButtonComponent>

      </PageComponent>
      <PageComponent href_={"#3"} color_={"gray"} background_={"purple"} position_={"sticky"}>

      </PageComponent>

      <PageComponent href_={"#4"} color_={"yellow"} background_={"pink"} height_={"100px;"}>

      </PageComponent>

      <PageComponent href_={"#5"} color_={"yellow"} background_={"purple"} height_={"500px;"}>

      </PageComponent>

      <PageComponent href_={"#6"} color_={"yellow"} background_={"yellow"} height_={"100px;"}>

      </PageComponent>

      <PageComponent href_={"#7"} color_={"yellow"} background_={"pink"} height_={"100px;"}>

      </PageComponent>
        <PageComponent href_={"#8"} color_={"orange"} background_={"yellow"} height_={"50%"} position_={"sticky"}>

        </PageComponent>

    </div>
  );
}

export default App;
