import React from "react";
import profilepic from "../../assets/profile.jpg"
import Grid from '@mui/material/Grid';
import data from "../../data/data.json"


const About = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} style={{ backgroundColor: "#000524", padding: "50px" }} id="about">
      <Grid
        container
        direction="row"
        maxWidth="xl"
        spacing={10}
        alignItems="stretch"
        justifyContent="center"
        overflow="hidden"
      >
        <Grid item xs={12} lg={5}>
          <img className="about-pic" src={profilepic} width={407} height={265}   alt="Image is not available. Sorry!"/>
        </Grid>
        <Grid item xs={12} lg={7}>
          <Grid
            container
            direction="row">
            <h1 style={{ color: "white" }}>Hello/Greetings! </h1>
            <p style={{ color: "white", textAlign: "left" }}>{data.about.description}            
            </p>
          </Grid>
        </Grid>
      </Grid>
    </section>
  );
});

export default About;
