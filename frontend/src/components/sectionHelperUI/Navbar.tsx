import React from "react";
import { handleClickScroll, useOnScreen } from "../../utils/common"
import Button from '@mui/material/Button';

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
                    }}>
                        <b>HOME</b>
                    </a>
                </li>

                <li>
                    <a style={{ color: page == 1 ? "orange" : "" }} onClick={() => {
                        handleClickScroll("about");
                    }
                    }>
                        <b>ABOUT</b>
                    </a>
                </li>

                <li>
                    <a style={{ color: page == 2 ? "orange" : "" }} onClick={() => {
                        handleClickScroll("resume");
                    }
                    }>
                        <b>RESUME</b>
                    </a>
                </li>
                <li>
                    <a style={{ color: page == 3 ? "orange" : "" }} onClick={() => {
                        handleClickScroll("service");
                    }
                    }>
                        <b>SERVICES</b>
                    </a>
                </li>

                <li>
                    <a style={{ color: page == 4 ? "orange" : "" }} onClick={() => {
                        handleClickScroll("portfolio");
                    }
                    }>
                        <b>PORTFOLIO</b>
                    </a>
                </li>

                <li style={{ float: "right" }}>
                    <a>
                        <Button
                            style={{ backgroundColor: page == 5 ? "white" : "",
                             color: page == 5 ? "orange" : "",
                             transition: "all 1s ease-out"

                             }}
                            variant="contained"
                            onClick={() => {
                                handleClickScroll("contact");
                            }}>
                            <b>CONTACT</b></Button>

                    </a>
                </li>


            </ul>

        </nav>
    );
});

export default Nabvar;