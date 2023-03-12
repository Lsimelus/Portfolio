import React from "react";
import Grid from '@mui/material/Grid';
import data from "../../data/data.json"
import Box from '@mui/material/Box';
import LaptopWindowsIcon from '@mui/icons-material/LaptopWindows';
import BuildIcon from '@mui/icons-material/Build';
import PsychologyIcon from '@mui/icons-material/Psychology';


export const skillSection = (hovered: boolean, data: { "cat": number }[], icon: any) => {
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




export const skillSections = (hovered: number, callback: Function) => {
    let mapper = data.tech as any
    var formattedData: any[] = [[], [], []]
    const techType: any = { 0: "Frontend", 1: "Backend", 2: "Tool" }

    for (const [key, value] of Object.entries(mapper)) {
        let data: any = value
        data["name"] = key
        formattedData[data["cat"]].push(data)
    }

    return (

        <div
            onMouseLeave={() => callback(-1)}
        >

            {formattedData.map(function (techList: any, idx: number) {
                if (idx == 0) {
                    var currIcon = <LaptopWindowsIcon></LaptopWindowsIcon>
                } else if (idx == 1) {
                    var currIcon = <PsychologyIcon></PsychologyIcon>

                } else {
                    var currIcon = <BuildIcon></BuildIcon>
                }
                const hoverActive = idx === hovered

                return (

                    <Grid item xs={4}
                        onMouseEnter={() => callback(idx)}
                    >
                        <p>test</p>


                        <Grid item xs={12}>
                            <h1>{techType[idx]}</h1>
                            {currIcon}
                        </Grid>
                        <Grid item xs={12}>
                            <>
                                {techList.map(function (tech: any) {
                                    return (
                                        <p>
                                            {hoverActive ?
                                                <b className="skill-tag" style={{ color: tech.color, backgroundColor: tech.color2, borderColor: tech.color }}>{tech.name}</b>
                                                :
                                                <b className="skill-tag">{tech.name}</b>
                                            }
                                        </p>
                                    );
                                })}
                            </>
                        </Grid>
                    </Grid>

                )

            })}

        </div>)

}
