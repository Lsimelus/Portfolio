import React, { RefObject } from "react";
import ParticlesBg from "particles-bg";
import Stack from '@mui/material/Stack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Grid from '@mui/material/Grid';
import GitHubIcon from '@mui/icons-material/GitHub';
import CodeIcon from '@mui/icons-material/Code';
import ButtonGroup from '@mui/material/ButtonGroup';
import DownloadIcon from '@mui/icons-material/Download';
import {links} from "../../data/data"
import { downloadResume, handleClickScroll } from "../../utils/reusableFunctions";
import Nabvar from "./Navbar";
import ResumeModal from "./ResumeModal"
import WorkIcon from '@mui/icons-material/Work';
import { ButtonComponent } from "../commonUIComponents/Button";


export interface HeaderProps {
  aboutRef: RefObject<HTMLElement>,
  resumeRef: RefObject<HTMLElement>,
  serviceRef: RefObject<HTMLElement>,
  portfolioRef: RefObject<HTMLElement>,
  contactRef: RefObject<HTMLElement>
}

const Header = (props: HeaderProps) => {
  const { aboutRef, resumeRef, serviceRef, portfolioRef, contactRef} = props;

  const headerRef = React.useRef<HTMLElement>(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  var desc = "< Fullstack Engineer/>"
  

  return (
    <header ref={headerRef} style={{ height: "100vh", overflow: "hidden" }} id="Home">
      <ParticlesBg type="circle" bg={true} />
      <Nabvar aboutRef={aboutRef} resumeRef={resumeRef} serviceRef={serviceRef} portfolioRef={portfolioRef} contactRef={contactRef} headerRef={headerRef}/>
      <ResumeModal getModal={modalOpen} setModal={setModalOpen}/>


      <div style={{ paddingTop: "100px" }}>
        <div>
          <h1 style={{ fontSize: "11vmin" }}>Hi, I'm <span style={{color: "orange", textShadow: "2px 2px 0px black"}}>Lyndbergh</span></h1>
          <h3 style={{ fontSize: "5vmin", marginRight: "20vw", marginLeft: "20vw", color: "orange", textShadow: "2px 2px 0px black" }}>{desc}</h3>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Stack direction="row" spacing={2} style={{marginBottom: "10vmin"}}>
              
              <ButtonComponent 
              onClick={() => window.open(links.main, "_blank")}
              text={"Github"} 
              startIcon={<GitHubIcon />}/>

            <ButtonComponent 
              onClick={() => window.open(links.site, "_blank")}
              startIcon={<CodeIcon />}     
              text={"Site Code"}/>

              <ButtonGroup  >
              <ButtonComponent 
              onClick={() => setModalOpen(true)} 
              text={"Resume"}/>

              <ButtonComponent 
              onClick={() => downloadResume()}
              >
                <DownloadIcon />
              </ButtonComponent>
              </ButtonGroup>

              <ButtonComponent 
              background={"linear-gradient(to right, #2DC85D 0%, #BE33FF 100%)"}
              onClick={() => handleClickScroll("Service")}
              text={"Hire Me"} 
              startIcon={<WorkIcon />}/>
            </Stack>

            <ButtonComponent 
              onClick={() => handleClickScroll("About")}
              ><KeyboardArrowDownIcon /></ButtonComponent>

          </Grid>
        </div>
      </div>

    </header >
  );

};

export default Header;
