import React from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { theme } from './theme';
import "./App.css";
import Header from "./components/HeaderSection"
import About from "./components/AboutSection";
import Resume from "./components/ResumeSection";
import Contact from "./components/ContactSection";
import Portfolio from "./components/PortfolioSection";
import { AlertDiv, alertType } from "./components/Alert"

const App = () => {
  // Alert hooks and function caller
  const [alertText, setAlertText] = React.useState("")
  const [alertSeverity, setAlertSeverity] = React.useState<alertType>("success")
  const [alertOpen, setAlertOpen] = React.useState(false)

  function openAlert(text: string, severity: alertType) {
    setAlertSeverity(severity)
    setAlertText(text)
    setAlertOpen(true)
  }

  // Section refs for navigation
  const aboutRef = React.useRef<HTMLElement>(null);
  const resumeRef = React.useRef<HTMLElement>(null);
  const portfolioRef = React.useRef<HTMLElement>(null);
  const contactRef = React.useRef<HTMLElement>(null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="App">
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
        />
        <About ref={aboutRef} />
        <Resume ref={resumeRef} />
        <Portfolio ref={portfolioRef} />
        <Contact alertCallback={openAlert} ref={contactRef} subjectFilled="" />
      </Box>
    </ThemeProvider>
  );
}

export default App;