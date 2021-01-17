import  styled  from  'styled-components';

const PageLayout = styled.div<{height: string, color: string, background: string , position: string}>`
    color: ${props => props.color};
    background-color:  ${props => props.background};
    right: 0px;
    left: 0px;
    top: 0px;
    border: 1px solid black;
    height:${props => props.height };
    position: ${props => props.position };
    }`;



export const PageComponent: React.FunctionComponent<{ href_: string, height_?: string, color_: string, background_: string , position_?: string}> = ({ href_, position_ , height_, color_, background_, children }) => (
    <PageLayout position={ position_ == undefined ? "relative" : position_ } color = {color_}  background = { background_ } height = { height_ == undefined ? "50px;" : height_ }>
        <div id={href_}  >{children}</div>

    </PageLayout>
);