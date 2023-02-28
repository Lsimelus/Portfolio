import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Item } from "../commonUI/Item"
import Divider from '@mui/material/Divider';
import data from "../../data/data.json"
import AttachmentIcon from '@mui/icons-material/Attachment';
import Box from '@mui/material/Box';
import { getWorkImage } from "../../utils/portfolioImages";


const portfolioProjects = data.portfolio.projects
const techstacks = data.portfolio.tech
const techValuesMap = (tech: number[]) => {
    var usedTech = []
    for (const num of tech) {
      usedTech.push(techstacks[num])
    }
    return usedTech.join(" - ")
}

export interface PortfolioProjectsProps {
  filter: number
}

const PortfolioProjects= (props: PortfolioProjectsProps) => {
  const { filter} = props;

  return(
      <>
      {portfolioProjects.map(function (projects, index) {
        const opacityFull = (filter === -1 || (projects["stack"]).includes(filter))

        return(
        <Grid key={index} item xs={6} md={4} lg={3}  >
          <Item elevation={10} style={{ opacity: opacityFull ? 1.0 : .3 }}>
          <div>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="stretch"
              p={2}
            >
              
              <Grid item xs={9}>
                <p><b>{projects["name"]}</b></p>
              </Grid>
              <Grid item xs={2}  >
  
                <Button disabled={!opacityFull || projects["link"] === "" }
                  target="_blank"
                  href={projects["link"]}
                >
                  <AttachmentIcon sx={{
                    color: "gray",
                    transition: "transform 1s",
                    opacity: projects["link"] === "" ? ".3" : "1" ,
                    "&:hover": {
                      color: "#7241C8",
                      transform: "scale(1.75)"
                    }
                  }} />
                </Button>
              </Grid>
              <Grid item xs={1}></Grid>
            </Grid>
            
  
            <Grid item xs={12}>
              <div className="work-dyn">
              <img src={getWorkImage(projects["image"])} className="work-pic"/
              ><p className="work-desc">{projects["blurb"]} </p>
              <footer className="work-footer">
              <Grid item xs={12}><Divider /></Grid><Box
                component="span"
                m={1}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              ><p>{techValuesMap(projects["stack"])}
                </p>
                <p>{projects["date"]}</p>
              </Box>
            </footer>
              </div>
              </Grid>
  
            
            </div>
          </Item>
        </Grid>)
      })}
      </>
    )
  }

export default PortfolioProjects

/*
{portfolioProjects.map(function (projects, index) {
    const opacityFull = (filter === -1 || (projects["stack"]).includes(techFilter))
    return (
      

      )
*/