import React from "react";
import Grid from '@mui/material/Grid';
import data from "../../data/data.json"
import { StyledButton } from "../commonUIComponents/Button"
import { Item } from "../commonUIComponents/Item"
import HandshakeIcon from '@mui/icons-material/Handshake';
import LockIcon from '@mui/icons-material/Lock';
import ShieldIcon from '@mui/icons-material/Shield';
import { ButtonComponent } from "../commonUIComponents/Button";


const portfolioServices = data.service

export interface ServiceProps {
    contactFormReset: Function
}

const Service = React.forwardRef<HTMLElement, ServiceProps>((props, ref) => {
    const { contactFormReset } = props;


    const getIcon = (index: number) => {
        if (index == 0) {
            var icon = <HandshakeIcon sx={{
                fontSize: 80,
                margin: 3
            }} />
        } else if (index == 1) {
            var icon = <LockIcon sx={{
                fontSize: 80,
                margin: 3
            }} />
        } else {
            var icon = <ShieldIcon sx={{
                fontSize: 80,
                margin: 3
            }} />
        }
        return icon

    }
    const card = (data: any, index: number) => {

        const info = data.desc.map(function (line: any, index: number) {
            return (
                <li>{line}</li>
            )
        })
        return (
            <Grid style={{ display: "flex", minHeight: "100%" }} item xs={12} md={6} lg={4}>
                <Grid
                    container
                    direction="column"
                    justifyContent="space-between"
                    alignItems="center"
                    m={5}
                >
                    <Item style={{ minHeight: "100%", minWidth: "100%", padding: "0px" }}>
                        <Grid item xs={12} >
                            <div style={{ backgroundColor: data.color, color: "white", marginBottom: "0px" }}>
                                {getIcon(index)}
                                <h1 >{data.title}</h1>
                                <h2>{data.price}</h2>
                            </div>

                            <ul style={{ textAlign: "left" }}>
                                {info}
                            </ul>
                        </Grid>

                        <footer style={{ margin: 5 }}>
                        <ButtonComponent
                        onClick={() => contactFormReset(data.title)}
                        background={data.color}
                                                text={"Get Started"}

                    />

                        </footer>
                    </Item>
                </Grid>
            </Grid>)

    }


    return (
        <section ref={ref} style={{ backgroundColor: "#000524", padding: "50px" }} id="Service">
            <Grid
                container
                direction="row"
                maxWidth="xl"
                justifyContent="center"
            >
                <Grid item xs={12}>
                    <h1 style={{ color: "white", margin: 30 }}>Service Plans</h1>
                </Grid>
                <Grid item xs={12}>
                    <ButtonComponent
                        onClick={() => contactFormReset("Fulltime opportunity")}
                        background={"linear-gradient(to right, #2DC85D 0%, #BE33FF 100%)"}
                        text={"Looking for a fulltime hire?"}

                    />
                </Grid>
                {portfolioServices.map(function (service: object, index: number) {
                    return (
                        card(service, index)
                    )
                })}
            </Grid>
        </section>
    );
});

export default Service;
