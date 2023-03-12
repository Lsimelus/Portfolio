import React, {RefObject} from "react";
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import data from "../../data/data.json"
import { skillSections, skillSection} from "../sectionHelperUI/ResumeHelper"
import { formatTechSection } from "../../utils/common"
import LaptopWindowsIcon from '@mui/icons-material/LaptopWindows';
import BuildIcon from '@mui/icons-material/Build';
import PsychologyIcon from '@mui/icons-material/Psychology';



const resumeWork: object[] = data.resume.work
const resumeEducation: object[] = data.resume.education


function useOnScreen(ref: any) {
  const [isIntersecting, setIntersecting] = React.useState(false)

  const observer = React.useMemo(() => new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting)
    , {
      rootMargin: "200px 0px -100px 0px"
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


export interface ResumeActivityProps {
  activity: {location: string, title:string, time: string, info:object[]}
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
        <h2 className="hidden" ref={resumeTitleRef as RefObject<HTMLHeadingElement>} style={{ textAlign: "left" }}>{activity.location}</h2>
      </Grid>
      <div className="hidden" ref={resumeDateRef as RefObject<HTMLHeadingElement>}>
        {activity.title &&
          <Grid item xs={12}>
            <p style={{ textAlign: "left", margin: "0px" }}><b>{activity.title}</b> ~ <em>{activity.time}</em></p>
          </Grid>
        }
      </div>
      <Grid item xs={12}>
        <ul className="hidden" ref={resumeInfoRef as RefObject<HTMLUListElement>} style={{ textAlign: "left" }}>
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
          if (idx == 0) {
            var currIcon = <LaptopWindowsIcon></LaptopWindowsIcon>
        } else if (idx == 1) {
            var currIcon = <PsychologyIcon></PsychologyIcon>

        } else {
            var currIcon = <BuildIcon></BuildIcon>
        }

          return (
            <Grid 
            item 
            xs={12} sm={idx == 2 ? 8 :6} lg={4}
            onMouseEnter={() => setSkillHover(idx)}
            onMouseLeave={() => setSkillHover(-1)}
            className={"skill-section"}
            style={{boxShadow: skillHover == idx ? "0 0 5px #ccc" : "", borderRadius: "35px"}}
             >{skillSection(skillHover == idx, tech, currIcon)}
        </Grid>
          );
        })}


      </Grid>
    </section>
  );
});

export default Resume;
