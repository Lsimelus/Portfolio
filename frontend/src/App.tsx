import React from 'react';
import "./App.css";
import Header from "./components/section/Header"
import About from "./components/section/About";
import Resume from "./components/section/Resume";
import Contact from "./components/section/Contact";
import Portfolio from "./components/section/Portfolio";
import {AlertDiv, alertType } from "./components/Alert"



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
  const portfolioRef = React.useRef<HTMLElement>(null);
  const contactRef = React.useRef<HTMLElement>(null);

  

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
      portfolioRef={portfolioRef}
      contactRef={contactRef}
      ></Header>
      <About ref={aboutRef} />
      <Resume ref={resumeRef}/>
      <Portfolio ref={portfolioRef}/>
      <Contact alertCallback={openAlert} ref={contactRef}/>
    </div>
  );

}

export default App;