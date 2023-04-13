import React, {RefObject} from "react";
import { handleClickScroll, useOnScreen } from "../../utils/reusableFunctions"
import { NavStyled, NavListStyled, NavListItemStyled, NavPages } from "../../styles/headerSection/NavbarStyled";

export interface NabvarProps {
    aboutRef: RefObject<HTMLElement>
    resumeRef:RefObject<HTMLElement>,
    portfolioRef:RefObject<HTMLElement>,
    serviceRef: RefObject<HTMLElement>,
    contactRef: RefObject<HTMLElement>,
    headerRef: RefObject<HTMLElement>
}
const navPages: string[] = ["Home", "About", "Resume",  "Service", "Portfolio", "Contact"]

const Nabvar = React.forwardRef<HTMLElement, NabvarProps>((props, ref) => {
    const { aboutRef, resumeRef, serviceRef, portfolioRef, contactRef, headerRef } = props;
    const [page, setPage] = React.useState(0);
    var currPage = [useOnScreen(headerRef), useOnScreen(aboutRef), useOnScreen(resumeRef),  useOnScreen(serviceRef), useOnScreen(portfolioRef),useOnScreen(contactRef)]

    
    React.useEffect(() => {
        var idx = currPage.indexOf("1")
        if (idx > -1) {
            setPage(idx)
        }
    }, [currPage])


    return (
        <NavStyled color={page === 0 ? "transparent" : "#000524"}>
            <NavListStyled >
                {navPages.map(function(pageName: string, idx:number){
                    return(<NavListItemStyled >
                        <NavPages className={page === idx ? "nav-active" : ""} onClick={() => {
                            handleClickScroll(pageName);
                        }}>
                            {pageName}
                        </NavPages>
                    </NavListItemStyled>)
                })}
            </NavListStyled >

        </NavStyled>
    );
});

export default Nabvar;