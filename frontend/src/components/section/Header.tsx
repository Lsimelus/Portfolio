import React from "react";
import ParticlesBg from "particles-bg";
import Stack from '@mui/material/Stack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Grid from '@mui/material/Grid';
import GitHubIcon from '@mui/icons-material/GitHub';
import CodeIcon from '@mui/icons-material/Code';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { StyledButton } from "../commonUI/Button"
import ButtonGroup from '@mui/material/ButtonGroup';
import DownloadIcon from '@mui/icons-material/Download';
import data from "../../data/data.json"
import { downloadResume, handleClickScroll } from "../../utils/common";
import Nabvar from "../sectionHelperUI/Navbar";
import ResumeModal from "../sectionHelperUI/ResumeModal"


export interface HeaderProps {
  aboutRef: any
  resumeRef: any,
  portfolioRef: any,
  contactRef: any
}

const Header = (props: HeaderProps) => {
  const { aboutRef, resumeRef , portfolioRef, contactRef} = props;

  const headerRef = React.useRef<HTMLElement>(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  

  return (
    <header ref={headerRef} style={{ height: "100vh", overflow: "hidden" }} id="home">
      <ParticlesBg type="circle" bg={true} />
      <Nabvar aboutRef={aboutRef} resumeRef={resumeRef} portfolioRef={portfolioRef} contactRef={contactRef} headerRef={headerRef}/>
      <ResumeModal getModal={modalOpen} setModal={setModalOpen}/>


      <div style={{ paddingTop: "100px" }}>
        <div>
          <h1 style={{ fontSize: "12vmin" }}>{data.header.name}</h1>
          <h3 style={{ fontSize: "6vmin", marginRight: "20vw", marginLeft: "20vw" }}>Driven ~ Innovative ~ Adaptable</h3>
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
