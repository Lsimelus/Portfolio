import React from 'react';
import "./App.css";
import Header from "./components/HeaderSection"
import About from "./components/AboutSection";
import Resume from "./components/ResumeSection";
import Contact from "./components/ContactSection";
import Portfolio from "./components/PortfolioSection";
import Service from "./components/ServiceSection";
import {AlertDiv, alertType } from "./components/Alert"
import { handleClickScroll} from "./utils/reusableFunctions"



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
    handleClickScroll("Contact")
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