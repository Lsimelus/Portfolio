import { tech } from "../../data/data"
import Box from '@mui/material/Box';
import { SkillTag } from "../../styles/resumeSection/SkillTagStyled"

export const SkillSection = (hovered: boolean, data: { "cat": number }[], icon: any) => {
    const techType: any = { 0: "Frontend", 1: "Backend", 2: "Tool Box" }

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
                        <>
                            {hovered ?
                                <SkillTag color={tech.color} title={tech.color2}>{tech.name}</SkillTag>
                                :
                                <SkillTag>{tech.name}</SkillTag>
                            }
                        </>
                    );
                })}
            </>
        </>
    )
}

export const formatTechSection = () => {
    let mapper = tech as any
    var formattedData: any[] = [[], [], []]

    for (const [key, value] of Object.entries(mapper)) {
        let data: any = value
        data["name"] = key
        formattedData[data["cat"]].push(data)
    }
    return formattedData
}