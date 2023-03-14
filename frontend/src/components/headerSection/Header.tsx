import React, { RefObject } from "react";
import ParticlesBg from "particles-bg";
import Stack from '@mui/material/Stack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Grid from '@mui/material/Grid';
import GitHubIcon from '@mui/icons-material/GitHub';
import CodeIcon from '@mui/icons-material/Code';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { StyledButton } from "../commonUIComponents/Button"
import ButtonGroup from '@mui/material/ButtonGroup';
import DownloadIcon from '@mui/icons-material/Download';
import data from "../../data/data.json"
import { downloadResume, handleClickScroll } from "../../utils/reusableFunctions";
import Nabvar from "./Navbar";
import ResumeModal from "./ResumeModal"
import WorkIcon from '@mui/icons-material/Work';


export interface HeaderProps {
  aboutRef: RefObject<HTMLElement>,
  resumeRef: RefObject<HTMLElement>,
  serviceRef: RefObject<HTMLElement>,
  portfolioRef: RefObject<HTMLElement>,
  contactRef: RefObject<HTMLElement>
}

const Header = (props: HeaderProps) => {
  const { aboutRef, resumeRef, serviceRef, portfolioRef, contactRef} = props;
  console.log(typeof aboutRef)

  const headerRef = React.useRef<HTMLElement>(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  var temp = "< Fullstack Engineer/>"
  

  return (
    <header ref={headerRef} style={{ height: "100vh", overflow: "hidden" }} id="home">
      <ParticlesBg type="circle" bg={true} />
      <Nabvar aboutRef={aboutRef} resumeRef={resumeRef} serviceRef={serviceRef} portfolioRef={portfolioRef} contactRef={contactRef} headerRef={headerRef}/>
      <ResumeModal getModal={modalOpen} setModal={setModalOpen}/>


      <div style={{ paddingTop: "100px" }}>
        <div>
          <h1 style={{ fontSize: "11vmin" }}>Hi, I'm <span style={{color: "orange", textShadow: "2px 2px 0px black"}}>Lyndbergh</span></h1>
          <h3 style={{ fontSize: "5vmin", marginRight: "20vw", marginLeft: "20vw", color: "orange", textShadow: "2px 2px 0px black" }}>{temp}</h3>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Stack direction="row" spacing={2}>
              <StyledButton size="large" variant="contained" startIcon={<GitHubIcon />}
                onClick={() => window.open(data.links.main, "_blank")}
              >
                Github
              </StyledButton>
              <StyledButton
                onClick={() => window.open(data.links.site, "_blank")}
                variant="contained" startIcon={<CodeIcon />}>
                Site Code
              </StyledButton>
              <ButtonGroup  >
                <StyledButton
                  onClick={() => setModalOpen(true)}
                  size="large" variant="contained" startIcon={<ReceiptIcon />}>
                  Resume
                </StyledButton>
                <StyledButton
                  onClick={() => downloadResume()}
                  size="medium" variant="contained">
                  <DownloadIcon />
                </StyledButton>
              </ButtonGroup>
              <StyledButton
              style={{ background: "linear-gradient(to right, #2DC85D 0%, #BE33FF 100%)" }}
                onClick={() => handleClickScroll("service")}
                variant="contained" startIcon={<WorkIcon />}>
                  <b>
                    Hire Me
               
                </b>
              </StyledButton>
              
            </Stack>

            <StyledButton
              onClick={() => handleClickScroll("about")}
              style={{ marginTop: "10vmin" }} variant="contained"
            >
              <KeyboardArrowDownIcon />
            </StyledButton>
          </Grid>
        </div>
      </div>

    </header >
  );

};

export default Header;
