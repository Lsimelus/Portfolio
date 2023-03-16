import React, {RefObject} from "react";
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import {resume} from "../../data/data"
import { SkillSection, formatTechSection} from "./SkillSectionComponent"
import LaptopWindowsIcon from '@mui/icons-material/LaptopWindows';
import BuildIcon from '@mui/icons-material/Build';
import PsychologyIcon from '@mui/icons-material/Psychology';
import {useOnScreen} from "./ResumeOnScreenFunction"
import {ResumeActivity} from "./ResumeActivityComponent"


const resumeWork: object[] = resume.work
const resumeEducation: object[] = resume.education
const currIcons: JSX.Element[] = [<LaptopWindowsIcon></LaptopWindowsIcon>, <PsychologyIcon></PsychologyIcon>, <BuildIcon></BuildIcon>]

const Resume = React.forwardRef<HTMLElement>((props, ref) => {
  const workRef = React.useRef<RefObject<HTMLElement>>(null);
  const educationRef = React.useRef<RefObject<HTMLElement>>(null);
  const skillRef = React.useRef<RefObject<HTMLElement>>(null);
  const skillTitleRef = React.useRef<RefObject<HTMLElement>>(null);
  useOnScreen(skillTitleRef)
  useOnScreen(workRef)
  useOnScreen(educationRef)
  useOnScreen(skillRef)

  const [skillHover, setSkillHover] = React.useState(-1)

  return (
    <section ref={ref} id="Resume">
      <Grid
        container
        direction="row"
        maxWidth="xl"
        spacing={4}
        alignItems="stretch"
        justifyContent="center"
        overflow="hidden"
        p={10}
      >
        <Grid item xs={12} md={2}>
          <h1 className="hidden" ref={workRef as any} >WORK</h1>
          <Divider />
        </Grid>
        <Grid item xs={12} md={10}>
          <Grid
            container
            direction="row"
            maxWidth="xl"
          >
            {resumeWork.map(function (job: any, index) {
              return (
                <ResumeActivity activity={job} />
              )
            })}
          </Grid>
        </Grid>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12} md={2}>
          <h1 className="hidden" ref={educationRef as any}>EDUCATION</h1>
          <Divider />
        </Grid>
        <Grid item xs={12} md={10}>
          <Grid
            container
            direction="row"
            maxWidth="xl"
          >
            {resumeEducation.map(function (school: any, index) {
              return (
                <ResumeActivity activity={school} />
              )
            })}

          </Grid>
        </Grid>

      </Grid>
      <Grid item xs={12}>
          <h1 className="hidden" ref={skillRef as any}>SKILLS</h1>
          <Divider />
        </Grid>
      <Grid
        container
        direction="row"
        maxWidth="xl"
        justifyContent="center"
        spacing={4}
        p={8}
        onMouseLeave={() => setSkillHover(-1)}
      >
        {formatTechSection().map(function (tech: any, idx:number) {

          return (
            <Grid 
            item 
            xs={12} sm={idx === 2 ? 8 :6} lg={4}
            onMouseEnter={() => setSkillHover(idx)}
            onMouseLeave={() => setSkillHover(-1)}
            className={"skill-section"}
            style={{boxShadow: skillHover === idx ? "0 0 5px #ccc" : "", borderRadius: "35px"}}
             >{SkillSection(skillHover === idx, tech, currIcons[idx])}
        </Grid>
          );
        })}


      </Grid>
    </section>
  );
});

export default Resume;
