import React from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Item } from "../commonUIComponents/Item"
import Divider from '@mui/material/Divider';
import data from "../../data/data.json"
import CodeIcon from '@mui/icons-material/Code';
import Box from '@mui/material/Box';
import { getWorkMedia } from "./getPortfolioMedia";
import ReactPlayer from 'react-player'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import CloseIcon from "@mui/icons-material/Close";


export interface PortfolioProjectsProps {
  opacity: boolean,
  projectData: any,
  setVideoMode: Function,
  videoMode: boolean
}

export const PortfolioProjects = (props: PortfolioProjectsProps) => {
  const { opacity, projectData, setVideoMode, videoMode } = props;
  const [videoIndex, setVideoIndex] = React.useState(-1);


  const media = getWorkMedia(projectData["media"])
  const image = media["image"] ?? null
  const vid = media["vid"] ?? null

  const [currMedia, setCurrMedia] = React.useState(image || vid);
  const projectStack = techValuesMap(projectData["stack"])

  const mediaIsVideo = () => {
    return (currMedia.split(".").pop() === "mp4")
  }


  return (
    <>
      {videoMode ?
        <Grid item xs={12} md={12} lg={8} >
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="center"
          >
            <Item elevation={20} style={{ opacity: opacity ? 1.0 : .3 }}>
              <div >
                <Box style={{ textAlign: "right" }}>
                  <CloseIcon
                    sx={{
                      color: "gray",
                      transition: "transform .5s",
                      "&:hover": {
                        color: "red",
                        transform: "scale(1.25)"
                      }
                    }}
                    onClick={() => { setVideoMode(true) }} />
                </Box>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="stretch"
                  p={2}
                >
                  <Grid item xs={9}>
                    <p><b>{projectData["name"]}</b></p>
                  </Grid>
                  <Grid item xs={2}  >

                    <Button disabled={!opacity || projectData["link"] === ""}
                      target="_blank"
                      href={projectData["link"]}
                    >
                      <CodeIcon sx={{
                        color: "gray",
                        transition: "transform .5s",
                        opacity: projectData["link"] === "" ? ".3" : "1",
                        "&:hover": {
                          color: "#7241C8",
                          transform: "scale(1.25)"
                        }
                      }} />
                    </Button>
                  </Grid>
                  <Grid item xs={1}></Grid>

                  <Grid item xs={9} lg={8}>

                    <ReactPlayer
                      className='react-player fixed-bottom'
                      url={vid}
                      playing={videoMode}
                      width='100%'
                      height='100%'
                      controls={true}

                    />
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <p className="work-desc" style={{ opacity: "1", maxHeight: "1000px", borderRadius: "25px" }}>{projectData["blurb"]} </p>

                    <footer>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Box
                        component="span"
                        m={1}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      ><p>{projectStack}
                        </p>
                        <p>{projectData["date"]}</p>
                      </Box>
                    </footer>

                  </Grid>
                </Grid>

              </div>

            </Item>

          </Grid>
        </Grid>

        :

        <Grid item xs={12} md={6} lg={4} >
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="center"
          >
            <Item
              elevation={10}
              style={{ opacity: opacity ? 1.0 : .3 }}
              onClick={() => videoMode == false && videoIndex !== -1 && setVideoIndex(-1)}
              onMouseEnter={() => vid && setCurrMedia(vid)}
              onMouseLeave={() => image && setCurrMedia(image)}
            >

              <div >
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="stretch"
                >

                  <Grid item xs={9}>
                    <p><b>{projectData["name"]}</b></p>
                  </Grid>
                  <Grid item xs={3}  >
                    <Box
                      component="span"
                      m={1}
                      display="flex"
                      justifyContent="space-around"
                      alignItems="center"
                    >

                      {vid &&

                        <Button disabled={!opacity || projectData["link"] === ""}
                          onClick={() => setVideoMode()}
                        >
                          <PlayCircleIcon sx={{
                            color: "gray",
                            transition: "transform .5s",
                            opacity: projectData["link"] === "" ? ".3" : "1",
                            "&:hover": {
                              color: "#7241C8",
                              transform: "scale(1.25)"
                            }
                          }} />
                        </Button>
                      }

                      <Button disabled={!opacity || projectData["link"] === ""}
                        target="_blank"
                        href={projectData["link"]}
                      >
                        <CodeIcon sx={{
                          color: "gray",
                          transition: "transform .5s",
                          opacity: projectData["link"] === "" ? ".3" : "1",
                          "&:hover": {
                            color: "#7241C8",
                            transform: "scale(1.25)"
                          }
                        }} />
                      </Button>
                    </Box>
                  </Grid>

                </Grid>

                <Grid item xs={12}>
                  <div className={opacity ? "work-dyn" : ""}>
                    <div className="media-frame">
                      <img src={image} className="work-pic" />
                    </div>
                    <p>{mediaIsVideo()}</p>
                    <p className="work-desc">{projectData["blurb"]} </p>
                  </div>
                </Grid>

                <footer>
                  <Grid item xs={12}><Divider /></Grid><Box
                    component="span"
                    m={1}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  ><p>{projectStack}
                    </p>
                    <p>{projectData["date"]}</p>
                  </Box>
                </footer>
              </div>

            </Item>

          </Grid>
        </Grid>
      }
    </>


  )
}


let mapper = data.tech as any
export const techValuesMap = (stack: any) => {

  return (<>
    {stack.map(function (techType: any) {
      let currColor = mapper[techType]["color"] ?? ""
      return (
        <span style={{ color: currColor }}><b>{techType}</b> </span>
      )
    })}
  </>)
}


