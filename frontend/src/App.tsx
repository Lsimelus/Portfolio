import React from 'react';
import "./App.css";
import Header from "./components/section/Header"
import About from "./components/section/About";
import Resume from "./components/section/Resume";
import Contact from "./components/section/Contact";
import Portfolio from "./components/section/Portfolio";
import Service from "./components/section/Service";
import {AlertDiv, alertType } from "./components/Alert"
import { handleClickScroll} from "./utils/common"



const App = () => {
  //Alert hooks and function caller
  const [alertText, setAlertText] = React.useState("")
  const [alertSeverity, setAlertSeverity] = React.useState<alertType>("success")//:TODO implement
  const [alertOpen, setAlertOpen] = React.useState(false)

  function openAlert(text: string, severity: alertType) {
    setAlertSeverity(severity)
    setAlertText(text)
    setAlertOpen(true)
  }
  
  //Section ref for header
  const aboutRef = React.useRef<HTMLElement>(null);
  const resumeRef = React.useRef<HTMLElement>(null);
  const servicesRef = React.useRef<HTMLElement>(null);
  const portfolioRef = React.useRef<HTMLElement>(null);
  const contactRef = React.useRef<HTMLElement>(null);

  const [subjectText, setSubjectText] = React.useState("");

  function contactFormReset(subjectContent: string){
    console.log("sdsfsfsf", subjectContent)
    handleClickScroll("contact")
    setSubjectText(subjectContent)

  }

  return (
    <div className="App">
      <AlertDiv
        openAlert={alertOpen}
        severity={alertSeverity}
        alertText={alertText}
        parentCallback={setAlertOpen}
      />
      <Header 
      aboutRef={aboutRef} 
      resumeRef={resumeRef}
      serviceRef={servicesRef}
      portfolioRef={portfolioRef}
      contactRef={contactRef}
      ></Header>
      <About ref={aboutRef} />
      <Resume ref={resumeRef}/>
      <Service ref={servicesRef} contactFormReset={contactFormReset}/>
      <Portfolio ref={portfolioRef}/>
      <Contact alertCallback={openAlert} ref={contactRef} subjectFilled={subjectText}/>
    </div>
  );

}

export default App;