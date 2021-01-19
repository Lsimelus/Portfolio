import React from 'react';
import './App.css';
import {PageComponent} from './Page'
import { ButtonComponent} from "./Button";
import {FormComponent} from "./Form";
import {NavComponent} from "./Nav";


function App() {
  return (
    <div className="App" >
        <div className="area">

        <NavComponent>
            <ul className="circles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>

            <ButtonComponent isDownload_={false} background_={"purple"} color_={"red"} link_={"mailto:lsimelus@gmail.com"} text_={"hjvhj"} />
            <ButtonComponent isDownload_={false} background_={"blue"} color_={"pink"} link_={"#8"} text_={"~~~~~~~~"} />
            <ButtonComponent isDownload_={true} background_={"green"} color_={"purple"} link_={"/Files/resume.pdf"} text_={"jbk,"} />
        </NavComponent>

            <div className="homepage">
                <h1>Lyndbergh Simelus</h1>
            </div>
        </div>




      <PageComponent href_={"#2"} color_={"yellow"} background_={"gray"} height_={"700px"} >



      </PageComponent>
      <PageComponent href_={"#3"} color_={"gray"} background_={"purple"}  />


      <PageComponent href_={"#4"} color_={"yellow"} background_={"pink"} height_={"100px;"} />




      <PageComponent href_={"#5"} color_={"yellow"} background_={"purple"} height_={"600px;"} />


      <PageComponent href_={"#6"} color_={"yellow"} background_={"yellow"} height_={"100px;"} />


      <PageComponent href_={"#7"} color_={"yellow"} background_={"pink"} height_={"1000px;"}>
          <FormComponent />

      </PageComponent>

        <PageComponent href_={"#8"} color_={"orange"} background_={"yellow"} height_={"50%"} position_={"sticky"} />

    </div>
  );
}

export default App;



/*
.nav {
  display: flex;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: var(--main-red);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.4);
  z-index: 10;
}

.nav-list {
  display: flex;
  margin-right: 2rem;
}


.contact-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    height: 80vh;
    padding: 0 2rem;
    background: var(--main-gray);
}

.contact-section-header > h2 {
    font-size: 6rem;
}

@media (max-width: 28.75em) {
.contact-section-header > h2 {
        font-size: 4rem;
    }
}

.contact-section-header > p {
    font-style: italic;
}

.contact-links {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 980px;
    margin-top: 4rem;
    flex-wrap: wrap;
}

.contact-details {
    font-size: 2.4rem;
    text-shadow: 2px 2px 1px #1f1f1f;
    transition: transform 0.3s ease-out;
}

.contact-details:hover {
    transform: translateY(8px);
}

//Footer

footer {
    font-weight: 300;
    display: flex;
    justify-content: space-evenly;
    padding: 2rem;
    background: var(--main-gray);
    border-top: 4px solid var(--main-red);
}

footer > p {
    margin: 2rem;
}

footer i {
    vertical-align: middle;
}

@media (max-width: 28.75em) {
    footer {
        flex-direction: column;
        text-align: center;
    }




 */