import  styled  from  'styled-components';

const PageLayout = styled.div<{height: string, color: string, background: string}>`
    color: ${props => props.color};
    background-color:  ${props => props.background};
    width: 100%;
    border: .5px solid black;
    height:${props => props.height };
    
    
    h1 {
        text-align: center;
        padding-top: 15px;
        padding-bottom: 15px;
        
    }
    }`;

const Container = styled.div <{}>`
    padding: 20px 50px;
    }`;


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