import React from "react";
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import {portfolio} from "../../data/data"
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { PortfolioProjects } from "../PortfolioCard"
import { ButtonComponent } from "../Button";


const portfolioProjects = portfolio.projects
const techstacks = portfolio.tech


const Portfolio = React.forwardRef<HTMLElement>((props, ref) => {
  const [techFilter, setTechFilter] = React.useState(-1);
  const [videoIndex, setVideoIndex] = React.useState(-1);

  var sortedProjects = []

  if (techFilter > -1) {
    sortedProjects = portfolioProjects.filter((data: { end: number[]; }) => data.end.includes(techFilter))
    sortedProjects = sortedProjects.concat(portfolioProjects.filter((data: { end: number[]; }) => !data.end.includes(techFilter)))
  } else {
    sortedProjects = portfolioProjects
  }

  React.useEffect(() => {
    setVideoIndex(-1)
  }, [techFilter])

  const filterButtons = techstacks.map(function (tech, index) {
    return (
      <ButtonComponent
        key={index}
        variant={techFilter === index ? "contained" : "outlined"}
        onClick={() => setTechFilter((techFilter === index ? -1 : index))}
        text={tech}
      />
    );
  });


  return (
    <section ref={ref} style={{ backgroundColor: "#EBEEEE", marginBottom: 50 }} id="Portfolio">
      <Grid
        container
        direction="row"
        maxWidth="xl"
        justifyContent="center"
        spacing={5}
        p={4}
      >

        <Grid item xs={12} >
          <h1 style={{ margin: 40 }}>Check Out Some of My Works</h1>
          <Divider />
        </Grid>


        <Grid item xs={12} >
          {filterButtons}
          <ButtonComponent
            onClick={() => { setTechFilter(-1); setVideoIndex(-1) }}
          >
            <RestartAltIcon />
          </ButtonComponent>
        </Grid>

        {sortedProjects.map(function (projects: any, index: number) {
          const opacityFull = (techFilter === -1 || (projects["end"]).includes(techFilter))
          const videoMode = videoIndex === index

          const setVideoMode = (reset: boolean = false) => {
            if (reset) {
              setVideoIndex(-1)
            } else {
              setVideoIndex(index)
            }
          }
          return (
            <PortfolioProjects
              opacity={opacityFull}
              projectData={projects}
              setVideoMode={setVideoMode}
              videoMode={videoMode}
            />
          )
        })}
      </Grid>
    </section>
  );
});

export default Portfolio;
