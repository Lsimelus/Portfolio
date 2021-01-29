import  styled  from  'styled-components';
import Theme from "./Theme";
import {FormComponent} from "./Form";
import {ContactComponent} from "./Contact";
import React from "react";

const PageLayout = styled.div<{height: string, color?: string, background: string}>`
    color: ${props => props.color};
    background: ${props => props.background};
    width: 100%;
    min-height:${props => props.height };
    height: auto;
    
    
    h1 {
        text-align: center;
        padding-top: 15px;
        padding-bottom: 15px;
        
    }
    }`;

const Container = styled.div <{}>`
    padding: 20px 50px;
    }`;

export const ContactPageComponent: React.FunctionComponent = ({ children }) => (
    <PageLayout id={"#Contact"} color={"transparent"} background = { "linear-gradient(#f5f5f5, #00008b)" } height = { "48vh" }>
        <Container>
            <FormComponent />
            <ContactComponent/>{children}
        </Container>
        background: linear-gradient({Theme.color.background2}, {Theme.color.darkblue});


    </PageLayout>
);

export const PageComponent: React.FunctionComponent<{ description_?: string, title_: string, height_?: string, color_?: string, background_: string }> = ({ description_, title_, height_, color_, background_, children }) => (
    <PageLayout id={"#"+title_} color = { color_ == undefined ? "black" : color_ }  background = { background_ } height = { height_ == undefined ? "90vh" : height_ }>
        <h1>
            {title_}
        </h1>
        <hr/>
        {description_ != undefined &&
        <Container>
            <p>
                {description_}
            </p>

        </Container>

        }
        <Container>{children}</Container>

    </PageLayout>
);