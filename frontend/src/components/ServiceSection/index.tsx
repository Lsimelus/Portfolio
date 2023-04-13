import React from "react";
import Grid from '@mui/material/Grid';
import { service } from "../../data/data"
import { ButtonComponent } from "../Button";
import { ServiceCard } from "../ServiceCard";

const portfolioServices = service

export interface ServiceProps {
    contactFormReset: Function
}

const Service = React.forwardRef<HTMLElement, ServiceProps>((props, ref) => {
    const { contactFormReset } = props;


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
                        ServiceCard(contactFormReset, service, index)
                    )
                })}
            </Grid>
        </section>
    );
});

export default Service;
