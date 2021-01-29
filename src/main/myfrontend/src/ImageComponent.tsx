import React, { Component } from "react";
import  styled  from  'styled-components';

export const ImageLayout = styled.img<{ border?: string, position?: string, height: string, background?: string, radius?: string}>`
    height: ${props => props.height};
   
    background: ${props => props.background};
    max-width: 100%;
    max-height: 100%;
    
    border-radius: 100px;
    border: ${props => props.border};
    }`;


export const ContainerLayout = styled.div<{ position?: string, l?: string, lp?: string, r?: string, rp?: string, t?: string, tp?: string, b?: string, bp?: string}>`
    max-width: 100%;
    max-height: 100%;
    
    left: ${props => props.l};
    right: ${props => props.r};
    bottom: ${props => props.b};
    top: ${props => props.t};
    
    padding-left: ${props => props.lp};
    padding-top: ${props => props.tp};
    padding-bottom: ${props => props.bp};
    padding-right: ${props => props.rp};
    
    position: ${props => props.position};
    display: inline-block;
    }`;

export const ImageComponent: React.FunctionComponent<{ border_?: string, position_?: string, src_: string, height_: string, background_?: string, radius_?: string, l_?: string, lp_?: string, r_?: string, rp_?: string, t_?: string, tp_?: string, b_?: string, bp_?: string,}>  = ({ border_,position_, l_ , lp_, r_, rp_, t_, tp_,b_, bp_,radius_, src_, height_, background_, children }) => {
    return (

        <ContainerLayout position={position_} l={ l_} lp={ lp_ == undefined ? "0px" : lp_} t={ t_ } tp={ tp_ == undefined ? "0px" : tp_ } r={ r_ } rp={ rp_ == undefined ? "0px" : rp_ } b={ b_ }  bp={ bp_ == undefined ? "0px" : bp_}>
            <ImageLayout border={border_ == undefined? "": border_} radius={radius_ == undefined? "10px": radius_} src={src_}  height={height_} background={background_} ></ImageLayout>
        </ContainerLayout>

    );
}