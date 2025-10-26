import React, { RefObject } from "react";
import { AppBar, Toolbar, Box, Button, Container, useScrollTrigger, useTheme } from '@mui/material';
import { handleClickScroll, useOnScreen } from "../../utils/reusableFunctions"

export interface NavbarProps {
    aboutRef: RefObject<HTMLElement>
    resumeRef: RefObject<HTMLElement>,
    portfolioRef: RefObject<HTMLElement>,
    serviceRef: RefObject<HTMLElement>,
    contactRef: RefObject<HTMLElement>,
    headerRef: RefObject<HTMLElement>
}

const navPages: string[] = ["Home", "About", "Resume", "Service", "Portfolio", "Contact"]

const Navbar = React.forwardRef<HTMLElement, NavbarProps>((props, ref) => {
    const { aboutRef, resumeRef, serviceRef, portfolioRef, contactRef, headerRef } = props;
    const theme = useTheme();
    const [page, setPage] = React.useState(0);

    const currPage = [
        useOnScreen(headerRef),
        useOnScreen(aboutRef),
        useOnScreen(resumeRef),
        useOnScreen(serviceRef),
        useOnScreen(portfolioRef),
        useOnScreen(contactRef)
    ]

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    });

    React.useEffect(() => {
        const idx = currPage.indexOf("1")
        if (idx > -1) {
            setPage(idx)
        }
    }, [currPage.join(',')])

    return (
        <AppBar
            position="fixed"
            elevation={trigger ? 2 : 0}
            sx={{
                background: trigger
                    ? 'rgba(255, 255, 255, 0.95)'
                    : 'transparent',
                backdropFilter: trigger ? 'blur(10px)' : 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                borderBottom: trigger ? `1px solid ${theme.palette.divider}` : 'none',
            }}
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ justifyContent: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        {navPages.map((pageName: string, idx: number) => (
                            <Button
                                key={pageName}
                                onClick={() => handleClickScroll(pageName)}
                                sx={{
                                    color: page === idx
                                        ? theme.palette.primary.main
                                        : trigger
                                            ? theme.palette.text.primary
                                            : '#FFFFFF',
                                    fontWeight: page === idx ? 600 : 500,
                                    fontSize: '0.9375rem',
                                    px: 2,
                                    py: 1,
                                    position: 'relative',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: 0,
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: page === idx ? '60%' : '0%',
                                        height: '2px',
                                        background: theme.palette.primary.main,
                                        transition: 'width 0.3s ease',
                                    },
                                    '&:hover': {
                                        bgcolor: 'transparent',
                                        '&::after': {
                                            width: '60%',
                                        }
                                    }
                                }}
                            >
                                {pageName}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
});

export default Navbar;