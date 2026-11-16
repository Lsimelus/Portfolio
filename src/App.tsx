import React from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { theme } from './theme';
import "./App.css";
import Header from "./components/HeaderSection"
import Resume from "./components/ResumeSection";
import Portfolio from "./components/PortfolioSection";
import Skills from "./components/SkillsSection";
import About from "./components/AboutSection";
import Contact from "./components/ContactSection";
import { AlertDiv, alertType } from "./components/Alert"

const App = () => {
  const [alertText, setAlertText] = React.useState("")
  const [alertSeverity, setAlertSeverity] = React.useState<alertType>("success")
  const [alertOpen, setAlertOpen] = React.useState(false)

  function openAlert(text: string, severity: alertType) {
    setAlertSeverity(severity)
    setAlertText(text)
    setAlertOpen(true)
  }

  React.useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

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
        {/* Page order is recruiter-first: resume → projects → skills → about → contact */}
        <Header />
        <Resume />
        <Portfolio />
        <Skills />
        <About />
        <Contact alertCallback={openAlert} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
