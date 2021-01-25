import React, { Component } from "react";
import  styled  from  'styled-components';
import logo from "./Files/Logo.png";
import github from "./Files/github.png";
import linkedin from "./Files/LinkedIn.png";
import insta from "./Files/instagram.png";
import location from "./Files/location3.png";
import phone from "./Files/phone.png";
import mail from "./Files/mail.png";

const ImageLayout = styled.img<{ position?: string, l?: string, lp?: string, r?: string, rp?: string, t?: string, tp?: string, b?: string, bp?: string, height: string, background?: string, radius?: string}>`
    height: ${props => props.height};
   
    background: ${props => props.background};
    max-width: 100%;
    max-height: 100%;
    border-radius: ${props => props.radius};
    left: ${props => props.l};
    right: ${props => props.r};
    bottom: ${props => props.b};
    top: ${props => props.t};
    
    padding-left: ${props => props.lp};
    padding-top: ${props => props.tp};
    padding-bottom: ${props => props.bp};
    padding-right: ${props => props.rp};
    
    position: ${props => props.position};
    }`;

export const ImageComponent: React.FunctionComponent<{position_?: string, src_: string, height_: string, background_?: string, radius_?: string, l_?: string, lp_?: string, r_?: string, rp_?: string, t_?: string, tp_?: string, b_?: string, bp_?: string,}>  = ({ position_, l_ , lp_, r_, rp_, t_, tp_,b_, bp_,radius_, src_, height_, background_, children }) => {
    return (
        <ImageLayout position={position_} radius={radius_ == undefined? "10px": radius_} src={src_}  height={height_} background={background_} l={ l_} lp={ lp_} t={ t_ } tp={ tp_ } r={ r_ } rp={ rp_ } b={ b_ }  bp={ bp_}></ImageLayout>

    );
}