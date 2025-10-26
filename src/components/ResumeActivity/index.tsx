import React, { RefObject } from "react";
import Grid from '@mui/material/Grid';
import { useOnScreen } from "../../utils/reusableFunctions"

interface ResumeActivityProps {
    activity: { location: string, title: string, time: string, info: object[] }
}

export const ResumeActivity = (props: ResumeActivityProps) => {
    const { activity } = props;
    const resumeInfoRef = React.useRef<HTMLElement>(null);
    const resumeTitleRef = React.useRef<HTMLElement>(null);
    const resumeDateRef = React.useRef<HTMLElement>(null);
    useOnScreen(resumeInfoRef, true)
    useOnScreen(resumeTitleRef, true)
    useOnScreen(resumeDateRef, true)

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
