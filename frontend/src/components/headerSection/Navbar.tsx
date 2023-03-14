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

const Nabvar = React.forwardRef<HTMLElement, NabvarProps>((props, ref) => {
    const { aboutRef, resumeRef, serviceRef, portfolioRef, contactRef, headerRef } = props;
    const [page, setPage] = React.useState(0);
    var currPage = [useOnScreen(headerRef), useOnScreen(aboutRef), useOnScreen(resumeRef), useOnScreen(serviceRef), useOnScreen(portfolioRef), useOnScreen(contactRef)]

    
    React.useEffect(() => {
        var idx = currPage.indexOf("1")
        if (idx > -1) {
            setPage(idx)
        }
    }, [currPage])


    return (
        <nav style={{ backgroundColor: page === 0 ? "transparent" : "" }}>
            <ul className="nav">
                <li >
                    <a className={page === 0 ? "nav-active" : ""} onClick={() => {
                        handleClickScroll("home");
                    }}>
                        HOME
                    </a>
                </li>

                <li>
                    <a className={page === 1 ? "nav-active" : ""} onClick={() => {
                        handleClickScroll("about");
                    }
                    }>
                        ABOUT
                    </a>
                </li>

                <li>
                    <a className={page === 2 ? "nav-active" : ""} onClick={() => {
                        handleClickScroll("resume");
                    }
                    }>
                        RESUME
                    </a>
                </li>
                <li>
                    <a className={page === 3 ? "nav-active" : ""} onClick={() => {
                        handleClickScroll("service");
                    }
                    }>
                        SERVICES
                    </a>
                </li>

                <li>
                    <a className={page === 4 ? "nav-active" : ""} onClick={() => {
                        handleClickScroll("portfolio");
                    }
                    }>
                        PORTFOLIO
                    </a>
                </li>

                <li >
                    <a className={page === 5 ? "nav-active" : ""} onClick={() => {
                        handleClickScroll("contact");
                    }
                    }>
                        CONTACT
                    </a>
                </li>


            </ul>

        </nav>
    );
});

export default Nabvar;