import React from "react";
import { handleClickScroll, useOnScreen } from "../../utils/common"



export interface NabvarProps {
    aboutRef: any
    resumeRef: any,
    portfolioRef: any,
    serviceRef: any,
    contactRef: any,
    headerRef: any
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
                    <a style={{ color: page === 0 ? "orange" : "" }} onClick={() => {
                        handleClickScroll("home");
                        setPage(0)
                    }}>
                        <b>HOME</b>
                    </a>
                </li>

                <li>
                    <a style={{ color: page == 1 ? "orange" : "" }} onClick={() => {
                        handleClickScroll("about");
                        setPage(1)
                    }
                    }>
                        <b>ABOUT</b>
                    </a>
                </li>

                <li>
                    <a style={{ color: page == 2 ? "orange" : "" }} onClick={() => {
                        handleClickScroll("resume");
                        setPage(2);
                    }
                    }>
                        <b>RESUME</b>
                    </a>
                </li>
                <li>
                    <a style={{ color: page == 3 ? "orange" : "" }} onClick={() => {
                        handleClickScroll("service");
                        setPage(5);
                    }
                    }>
                        <b>SERVICES</b>
                    </a>
                </li>

                <li>
                    <a style={{ color: page == 4 ? "orange" : "" }} onClick={() => {
                        handleClickScroll("portfolio");
                        setPage(3);
                    }

                    }>
                        <b>PORTFOLIO</b>
                    </a>
                </li>

                <li>
                    <a style={{ color: page == 5 ? "orange" : "" }} onClick={() => {
                        handleClickScroll("contact");
                        setPage(4)
                    }
                    }>
                        <b>CONTACT</b>
                    </a>
                </li>
            </ul>
        </nav>
    );
});

export default Nabvar;