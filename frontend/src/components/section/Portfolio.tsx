import React from "react";
import Grid from '@mui/material/Grid';
import { StyledButton } from "../commonUI/Button"
import Divider from '@mui/material/Divider';
import data from "../../data/data.json"
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PortfolioProjects from "../sectionHelperUI/PortfolioProjects";


const techstacks = data.portfolio.tech

const Portfolio = React.forwardRef<HTMLElement>((props, ref) => {
  const [techFilter, setTechFilter] = React.useState(-1);

  const filterButtons = techstacks.map(function (tech, index) {
    return (
      <StyledButton
        style={{ margin: 2 }}
        key={index}
        variant={techFilter === index ? "contained" : "outlined"}
        onClick={() => setTechFilter((techFilter === index ? -1 : index))}
      >
        {tech}
      </StyledButton>
    );
  });


  return (
    <section ref={ref} style={{ backgroundColor: "#EBEEEE" }} id="portfolio">
      <Grid
        container
        direction="row"
        maxWidth="xl"
        justifyContent="flex-start"
        spacing={5}
        p={4}
      >
        <Grid item xs={12} >
          <h1 >Check Out Some of My Works</h1>
          <Divider />
        </Grid>
        <Grid item xs={12} >
          {filterButtons}
          <StyledButton
            style={{ margin: 2 }}
            variant={"contained"}
            onClick={() => setTechFilter(-1)}
          >
            <RestartAltIcon />
          </StyledButton>
        </Grid>

        <PortfolioProjects filter={techFilter} />
      </Grid>
    </section>
  );
});

export default Portfolio;
