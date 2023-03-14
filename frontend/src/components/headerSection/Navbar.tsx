import React, {RefObject} from "react";
import { handleClickScroll, useOnScreen } from "../../utils/reusableFunctions"

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
        <nav style={{ backgroundColor: page === 0 ? "transparent" : "" }}>
            <ul className="nav">
                {navPages.map(function(pageName: string, idx:number){
                    return(<li >
                        <a className={page === idx ? "nav-active" : ""} onClick={() => {
                            handleClickScroll(pageName);
                        }}>
                            {pageName}
                        </a>
                    </li>)
                })}
            </ul>

        </nav>
    );
});

export default Nabvar;