import React from "react";
import Grid from '@mui/material/Grid';
import data from "../../data/data.json"
import Box from '@mui/material/Box';
import LaptopWindowsIcon from '@mui/icons-material/LaptopWindows';
import BuildIcon from '@mui/icons-material/Build';
import PsychologyIcon from '@mui/icons-material/Psychology';


export const SkillSection = (hovered: boolean, data: { "cat": number }[], icon: any) => {
    const techType: any = { 0: "Frontend", 1: "Backend", 2: "Tools" }

    return (
        <>
            <Box
                component="span"
                m={1}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
            >
                <h1 style={{ margin: 10 }}>{techType[data[0]["cat"]]}</h1>
                {icon}
            </Box>
            <>
                {data.map(function (tech: any) {
                    return (
                        <p>
                            {hovered ?
                                <b className="skill-tag" style={{ color: tech.color, backgroundColor: tech.color2, borderColor: tech.color }}>{tech.name}</b>
                                :
                                <b className="skill-tag">{tech.name}</b>
                            }
                        </p>
                    );
                })}
            </>

        </>
    )
}
export const formatTechSection= () => {
    let mapper = data.tech as any
    var formattedData: any[] = [[], [], []]
    
    for (const [key, value] of Object.entries(mapper)) {
      let data: any = value
      data["name"] = key
      formattedData[data["cat"]].push(data)
    }
    return formattedData
  }