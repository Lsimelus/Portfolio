import React from "react";
import Grid from '@mui/material/Grid';
import { Item } from "../../styles/commonUIComponents/ItemStyled"
import HandshakeIcon from '@mui/icons-material/Handshake';
import LockIcon from '@mui/icons-material/Lock';
import ShieldIcon from '@mui/icons-material/Shield';
import { ButtonComponent } from "../Button";


const getIcon = [<HandshakeIcon sx={{
    fontSize: 80,
    margin: 3
}} />,
<LockIcon sx={{
    fontSize: 80,
    margin: 3
}} />,
<ShieldIcon sx={{
    fontSize: 80,
    margin: 3
}} />

]

export const ServiceCard = (fromReset: Function, data: any, index: number) => {

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
                            {getIcon[index]}
                            <h1 >{data.title}</h1>
                            <h2>{data.price}</h2>
                        </div>

                        <ul style={{ textAlign: "left" }}>
                            {info}
                        </ul>
                    </Grid>

                    <footer style={{ margin: 5 }}>
                        <ButtonComponent
                            onClick={() => fromReset(data.title)}
                            background={data.color}
                            text={"Get Started"}

                        />

                    </footer>
                
                </Item>
  
            </Grid>
        </Grid>)

}
