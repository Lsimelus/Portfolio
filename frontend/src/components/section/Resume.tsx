import React from "react";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Divider from '@mui/material/Divider';
import data from "../../data/data.json"


const resumeSkills: { [key: string]: number } = data.resume.skills
const resumeWork: object[] = data.resume.work
const resumeEducation: object[] = data.resume.education


function useOnScreen(ref: any) {
  const [isIntersecting, setIntersecting] = React.useState(false)

  const observer = React.useMemo(() => new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting)
    , {
      rootMargin: "-100px 0px -100px 0px"
    }), [ref])

  React.useEffect(() => {
    if (ref.current) {

      observer.observe(ref.current)
      return () => observer.disconnect()
    }
  }, [])

  if (ref.current && ref.current.classList.contains("hidden")) {
    if (isIntersecting) {
      ref.current.classList.add("show")
    } else {
      ref.current.classList.remove("show")
    }
  }
  return isIntersecting
}

export interface SkillActivityProps {
  skill: string
}

const SkillActivity = (props: SkillActivityProps) => {
  const { skill } = props;
  const skillTitleRef = React.useRef<HTMLElement>(null);
  useOnScreen(skillTitleRef)
  var currSkillVal = resumeSkills[skill] * 10

  function getRandomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 40,
    borderRadius: 5,
    overflow: "hidden",
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: getRandomColor(),
      transition: "all 1000ms",
    },
  }));



  return (
    <>
      <Grid item xs={12}>
        <h2 className="hidden" ref={skillTitleRef as any} style={{ textAlign: "left" }}>{skill}</h2>
      </Grid>
      <Grid item xs={12}>
        <div>
          <BorderLinearProgress variant="determinate" value={currSkillVal} />
        </div>
      </Grid>
    </>
  )
}

export interface ResumeActivityProps {
  activity: any
}

const ResumeActivity = (props: ResumeActivityProps) => {
  const { activity } = props;
  const resumeInfoRef = React.useRef<HTMLElement>(null);
  const resumeTitleRef = React.useRef<HTMLElement>(null);
  const resumeDateRef = React.useRef<HTMLElement>(null);
  useOnScreen(resumeInfoRef)
  useOnScreen(resumeTitleRef)
  useOnScreen(resumeDateRef)

  return (
    <>
      <Grid item xs={12}>
        <h2 className="hidden" ref={resumeTitleRef as any} style={{ textAlign: "left" }}>{activity.location}</h2>
      </Grid>
      <div className="hidden" ref={resumeDateRef as any}>
        {activity.title &&
          <Grid item xs={12}>
            <p style={{ textAlign: "left", margin: "0px" }}><b>{activity.title}</b> ~ <em>{activity.time}</em></p>
          </Grid>
        }
      </div>
      <Grid item xs={12}>
        <ul className="hidden" ref={resumeInfoRef as any} style={{ textAlign: "left" }}>
          {(activity.info).map(function (act: any, index: number) {
            return (
              <li key={activity.location + String(index)}>{(act)}</li>
            )
          })}
        </ul>
      </Grid>
    </>
  )
}

const Resume = React.forwardRef<HTMLElement>((props, ref) => {

  const workRef = React.useRef<HTMLElement>(null);
  const educationRef = React.useRef<HTMLElement>(null);
  const skillRef = React.useRef<HTMLElement>(null);
  const skillTitleRef = React.useRef<HTMLElement>(null);
  useOnScreen(skillTitleRef)
  useOnScreen(workRef)
  useOnScreen(educationRef)
  useOnScreen(skillRef)



  return (
    <section ref={ref} id="resume">
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

        <Grid item xs={12} md={2}>
          <h1 className="hidden" ref={skillRef as any}>SKILLS</h1>
          <Divider />
        </Grid>
        <Grid item xs={12} md={10}>
          <Grid
            container
            direction="row"
            maxWidth="xl"
          >
            {Object.keys(resumeSkills).map(function (skill: string, index) {
              return (

                <SkillActivity skill={skill} />

              )
            })}
          </Grid>
        </Grid>
      </Grid>
    </section>
  );
});

export default Resume;
