import React from 'react';
import './App.css';
import {ContactPageComponent, PageComponent} from './Page'
import { ButtonComponent} from "./Button";
import {FormComponent} from "./Form";
import {NavComponent} from "./Nav";
import {FooterComponent} from "./Footer";
import logo from './Files/Logo.png'
import resume from './Files/resume.pdf'
import profile from './Files/pic1.jpg'
import Theme from "./Theme";
import {ImageComponent } from "./ImageComponent";
import {AboutComponent} from "./About";
import { PortfolioComponent} from "./Portfolio";

const App: React.FunctionComponent = () =>{
  return (
    <div className="App" >
        <div id="#Home" className="area">

        <NavComponent>
            <ul className="circles">
                <li/>
                <li/>
                <li/>
                <li/>
                <li/>
                <li/>
                <li/>
                <li/>
                <li/>
                <li/>
            </ul>


            <ImageComponent position_={"fixed"} src_={logo} height_={"10vh"} radius_={"10px"} t_={"0"} l_={"0"}></ImageComponent>
            <ButtonComponent  link_={"#Home"} text_={"Home"} />
            <ButtonComponent link_={"#About Me"} text_={"About Me"} />
            <ButtonComponent link_={"#Portfolio"} text_={"Portfolio"} />
            <ButtonComponent  link_={"#Contact"} text_={"Contact"} />
            <ButtonComponent isDownload_={true} background_={Theme.color.aqua}  link_={resume} text_={"Resume"} />

        </NavComponent>

            <ImageComponent border_={"5px solid #00008b"} src_={profile} height_={"65vh"} radius_={"90%"} rp_={"90vh"} tp_={"20vh"} />

            <div className="homepage">
                <h1>Lyndbergh Simelus</h1>
                <hr/>
                <h3>-Software Engineer-</h3>
                <p>Focused. Determined. Driven.</p>
            </div>
        </div>


      <PageComponent background_={Theme.color.background2} title_={"About Me"} height_={"150vh"}>
          <AboutComponent />
      </PageComponent>

      <PageComponent description_={"Here are descriptions, code, and media of some cool projects that I have done so far"}  background_={Theme.color.background2} title_={"Portfolio"}>
          <PortfolioComponent />
      </PageComponent>
        <ContactPageComponent></ContactPageComponent>

        <FooterComponent/>

    </div>
  );
}

export default App;
